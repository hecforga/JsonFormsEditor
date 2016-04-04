
var request = require('request');
var config = require('../config/config.js');

var api = {};

api.getRepoList = function(token, callback){

    var options = {
		url: "https://api.github.com/user/repos?access_token="+token,
		headers: {
			//    "Authorization": "token "+token,
			"User-Agent": config.appName
		}
	};
    request(options, function(error, response, body){
	    if(error){
		callback(error);
	    }else{
		callback(null, response);
	    }
    });
};

api.getBranchList = function(token, ownerName, repoName, callback){
	if(!token||!ownerName||!repoName){
		callback('Missing data');
		return;
	}
	var options = {
		url: "https://api.github.com/repos/"+ownerName+"/"+repoName+"/branches?access_token="+token,
		headers: {
			"User-Agent": config.appName
		}
	};

	request(options, function(error, response, body){
		if(error){
			callback(error);
		}else{
			callback(null, response);
		}
	});
};
api.getFilesFromBranch = function(token, ownerName, repoName, branchName, callback){
	if(!token||!ownerName||!repoName||!branchName){
		callback('Missing data');
		return;
	}
	var options = {
                url: "https://api.github.com/repos/"+ownerName+"/"+repoName+"/commits/"+branchName+"?access_token="+token,
		headers: {
			"User-Agent": config.appName
		}
	};
	request(options, function(error, response, body){
		if(error){
			callback(error);
		}else{
		        
			callback(null, response);
		}
	});
};

api.getFilesFromTree = function(token, treeUrl, callback){
    if(!token || !treeUrl){
	callback('Missing data');
    }
    var options = {
	url: treeUrl+"?access_token="+token,
	headers: {
	    "User-Agent":config.appName
	}
    };
    request(options, function(error, response, body){
	    if(error){
		callback(error);
	    }else{
		callback(null, response);
	    }
    });
};

module.exports = api;