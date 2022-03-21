require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const personSchema = new Schema({
    name: {type: String, required: true},
    age: Number, 
    favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {
    var johnDoe = new Person({name: "John Doe", age: 25, favoriteFoods: ["Naan", "Pizza", "Burger", "Steak"]});
    johnDoe.save((err, data) => {
        if(err)
            return console.error(err);

        done(null, data);
    });
};

var arrayOfPeople = [
    {name: "Bob", age: 68, favoriteFoods:["Subway"]},
    {name: "Carl", age: 21, favoriteFoods:["Venison Steak"]},
    {name: "Felix", age: 26, favoriteFoods:["Big Mac"]}
];

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => {
        if(err)
            return console.log(err);

    done(null, data);
    });
};

const findPeopleByName = (personName, done) => {
    Person.find({name: personName}, (err, data) => {
        if (err)
            return console.log(err);

      done(null, data);
    });
};

const findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, (err, data) => {
        if (err)
            return console.error(err);
      done(null, data);
    });
};

const findPersonById = (personId, done) => {
    Person.findById({_id: personId}, (err, data) => {
        if(err) 
            return console.error(err);

        done(null, data);
    });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

    Person.findById(personId, (err, data) => {
        if(err)
            return console.error(err);

        data.favoriteFoods.push(foodToAdd);

        data.save((err, updatedData) => {
            if(err)
                return console.error(err);
            done(null, updatedData);
        });
    });

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedData) => {
        if(err)
            return console.error(err);
        done(null, updatedData);
    });
};

const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, data) => {
        if(err)
            return console.error(err);
        done(null, data);
    });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
    Person.deleteMany({name: nameToRemove}, (err, data) => {
        if(err)
            return console.error(err);
        done(null, data);
    });

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
    var queryResult = Person.find({favoriteFoods: foodToSearch});
    queryResult.sort({name: "asc"});
    queryResult.limit(2);
    queryResult.select({ age:0 });
    queryResult.exec((err, data) => {
        if(err)
            return console.error(err);
        done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
