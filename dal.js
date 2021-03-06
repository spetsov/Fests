var mongoose = require( 'mongoose' ),
ext = require('node.extend'),
ObjectId = mongoose.Types.ObjectId,
dal = exports,

CountriesSchema = new mongoose.Schema({
    Title: String,
    FlagUrl: String
    }),
    
SongsSchema = new mongoose.Schema({
    Country: { type: mongoose.Schema.ObjectId, ref: 'countries' },
    Singer: String, 
    Title: String, 
    Link: String,
    Semifinal: Number,
    Final: Boolean,
    FestId: mongoose.Schema.ObjectId
    }),

FestsSchema = new mongoose.Schema({
    Title: String, 
    LogoUrl: String,
    StartDate: Date,
    QualifiersDate: Date,
    EndDate: Date,
    SemifinalCount: Number
    }),
    
FestsEntriesSchema = new mongoose.Schema({
    CountryId: mongoose.Schema.ObjectId,
    FestId: mongoose.Schema.ObjectId,
    UserId: mongoose.Schema.ObjectId,
    Song: { type: mongoose.Schema.ObjectId, ref: 'songs' }
}),
    
UsersSchema = new mongoose.Schema({
    Mail: {
      type: String
    , required: true
    , match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/
    },
    Password: String,
    IsAdmin: Boolean
});

FestsEntriesSchema.index({CountryId: 1, FestId: 1}, {unique: true});

//Models
var SongsModel = dal.SongsModel = mongoose.model('songs', SongsSchema);

var FestsModel = dal.FestsModel = mongoose.model('fests', FestsSchema);

var UsersModel = dal.UsersModel = mongoose.model('users', UsersSchema);

var CountriesModel = dal.CountriesModel = mongoose.model('countries', CountriesSchema);

dal.getUserByMail = function(userName, callback){
    UsersModel.findOne({Mail: userName}, function(err, user){
        callback(err, user);
    });
};

dal.getUserById = function(userId, callback){
    UsersModel.findById(userId, function(err, user) {
        callback(err,user);
    }); 
};

dal.createUser = function(params, callback){
    var user = ext(true, {}, params);
    user.IsAdmin = false;
    var userModel = new UsersModel(user);
    userModel.save(function(err){
        if(err){
            throw err;
        }
        else{
            callback(userModel);
        }
    })
};

dal.getAllFests = function(callback){
    FestsModel.find(function(err, fests){
        if(err){
            throw err;
        }
        else{
            callback(fests);
        }
    });
};

dal.getFestById = function(festId, callback){
    FestsModel.findById(festId, function(err, fest){
        if(err){
            throw err;
        }
        else{
            callback(fest);
        }
    });
};

dal.createFest = function(params, callback){
    var fest = ext(true, {}, params);
    var festModel = new FestsModel(fest);
     festModel.save(function(err){
         if(err){
             throw err;
         }
     });
     callback(festModel);
};

dal.updateFest = function(festId, params, callback){
    FestsModel.findById(festId, function(err, fest){
        if(err){
            throw err;
        }
        else{
            ext(true, fest, params);
            fest.save(function(err){
                if(err){
                    throw err;
                }
            })
            callback(fest);
        }
    });
};

dal.deleteFest = function(festId, callback){
    FestsModel.remove({_id: festId}, function(err){
        callback(err);
    });
};

dal.getAllSongs = function(callback){
    SongsModel.populate('Country').find(function(err, songs){
        if(err){
            throw err;
        }
        else{
            callback(songs);
        }
    });
};

dal.getSongById = function(id, callback){
    SongsModel.populate('Country').findById(id, function(err, song){
        if(err){
            throw err;
        }
        else{
            callback(song);
        }
    });
};

dal.getSongByFestAndSemi = function(festId, semi, callback){
    if(semi == "f"){
        SongsModel
        .find({FestId: new ObjectId(festId)})
        .populate('Country')
        .where('Final').equals(true)
        .exec(function(err, songs){
            if(err){
                throw err;
            }
            else{
                callback(songs);
            }
        })
    }
    else{
        SongsModel
        .find({FestId: new ObjectId(festId)})
        .populate('Country')
        .where('Semifinal').equals(semi)
        .exec(function(err, songs){
            if(err){
                throw err;
            }
            else{
                callback(songs);
            }
        })
    }
};

dal.createSong = function(params, callback){
    var song = ext(true, {}, params);
    var songModel = new SongsModel(song);
    
    songModel.save(function(err){
       if(err){
           throw err;
       }
       else{
        SongsModel
        .find({_id: new ObjectId(songModel.id)})
        .populate('Country')
        .exec(function(err, songs){
            if(err){
                throw err;
            }
            else{
                callback(songs);
            }
        })
    }
});
     
};

dal.updateSong = function(songId, params, callback){
    SongsModel.findById(songId, function(err, song){
        ext(true, song, params);
        song.save(function(err){
            if(err){
                throw err;
            }   
        });
        callback(song);
    });
};

dal.deleteSong = function(songId, callback){
    SongsModel.remove({_id: songId}, function(err){
        callback(err);
    });
};

dal.getAllCountries = function(callback){
    CountriesModel.find(function(err, countries){
        if(err){
            throw err;
        }
        else{
            callback(countries);
        }
    });
};

dal.getCountryById = function(id, callback){
    CountriesModel.findById(id, function(err, country){
        if(err){
            throw err;
        }
        else{
            callback(country);
        }
    });
};

dal.createCountry = function(params, callback){
    var country = ext(true, {}, params);
    var countryModel = new CountriesModel(country);
    
     countryModel.save(function(err){
         if(err){
             throw err;
         }
     });
     callback(countryModel);
};

dal.updateCountry = function(countryId, params, callback){
    CountriesModel.findById(countryId, function(err, country){
        ext(true, country, params);
        country.save(function(err){
            if(err){
                throw err;
            }   
        });
        callback(country);
    });
};

dal.deleteCountry = function(countryId, callback){
    CountriesModel.remove({_id: countryId}, function(err){
        callback(err);
    });
};
