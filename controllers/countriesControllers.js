const Countrey = require("../db/model");
const CountreyControllers = {};

CountreyControllers.showAllCounteries = async (req, res) => {
  try {
    let countries = await Countrey.find({}).select(
      "name.common name.official -_id"
    );
    await res.json(countries);
  } catch (e) {
    console.log(e);
  }
};
CountreyControllers.showCounteryByName = async (req, res) => {
  const { name } = req.params;
  try {
    let country = await Countrey.find({
      $or: [{ "name.common": name }, { "name.official": name }],
    });
    if (country.length) {
      await res.json(country);
    } else {
      await res.status(404).json({ message: "Country not found" });
    }
  } catch (e) {
    console.log(e);
  }
};
CountreyControllers.showCounteryByCountryCode = async (req, res) => {
  let { countryCode } = req.params;
  try {
    let country = {};

    // if countryCode is not numerical value then excute the if  statement
    //  else execute the else statement
    if (isNaN(countryCode)) {
      country = await Countrey.find({
        $or: [{ cca2: countryCode }, { cca3: countryCode }],
      });
    } else {
      countryCode = parseInt(countryCode);
      country = await Countrey.find({ ccn3: countryCode });
    }

    if (country.length) {
      await res.json(country);
    } else {
      await res.status(404).json({ message: "Country not found" });
    }
  } catch (e) {
    console.log(e);
  }
};

CountreyControllers.getCurrency = async (req, res) => {
  const { cca2 } = req.params;
  try {
    let currency = await Countrey.find({ cca2: cca2 }).select(
      "name.common currencies -_id"
    );
    if (currency.length) {
      await res.json(currency);
    } else {
      await res
        .status(404)
        .json({
          message: "Country with that CCA2(country code alpha-2) not found",
        });
    }
  } catch (e) {
    console.log(e);
  }
};

CountreyControllers.getbyReagion = async (req, res) => {
  const { region } = req.params;
  try {
    let countries = await Countrey.find({ region: region }).select("name -_id");
    if (countries.length) {
      await res.json(countries);
    } else {
      await res
        .status(404)
        .json({ message: "countries not found in this region" });
    }
  } catch (e) {
    console.log(e);
  }
};

CountreyControllers.getbyLanguage = async (req, res) => {
  const { language } = req.params;
  const extension = language.slice(0, 3).toLowerCase();

  try {
    let countries=await Countrey.find({})
    let countriesWithLanguage=  countries.filter(country=>{
            return country.languages&&country.languages[extension]
        })
        if (countriesWithLanguage.length) {
            await res.json(countriesWithLanguage);
        }else{
            await res.status(404).json({message:"countries not found in this language"})
        }
}catch(e){
    console.log(e)
}
}

module.exports = { CountreyControllers };
