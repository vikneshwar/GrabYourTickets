var fs = require('fs');
var memoryCache = require('../utility/memoryCache.js')();
var async = require('async');


var config = require('../config.js');
if(config.NODE_ENV.toLowerCase() == "dev") {
	var redis = require('redis');
	var client = redis.createClient();
	client.on('connect',function(){
		console.log("redis connected");	
	});	
}

/*initialize controller*/
var getMoviesCtrl = require('../controller/getMovies.js');
var getCinemasCtrl = require('../controller/getCinemas.js');

/*cityList.forEach(function(city){
	getMovies(city.toLowerCase(), function(err,movieData){
		if(err) console.log(err);
		else {
			movieList = movieData;
			getCinemas(city.toLowerCase(), function(err,cinemaData){
			if(err) console.log(err);
			else {
				cinemaList = cinemaData;
				cityData.movieList = movieList;
				cityData.cinemaList = cinemaList;
				memoryCache.set(city.toLowerCase(),cityData);
				}
			});
		}
	});
});*/
function dataProcessor() {
	// var self = this;
	//var city = ['Amalapuram','Anantapur', 'Bapatla','Bhimavaram','Chinnakakani','Chinnamandem', 'Chintalapudi', 'Chirala', 'Dharmavaram', 'Gudur', 'Guntakal', 'Guntur', 'Jangareddy-Gudem', 'Kakinada', 'Kavali', 'Kurnool', 'Macherla', 'Machilipatnam', 'Martur', 'Mylavaram', 'Narasaraopet', 'Narsapur', 'Narsipatnam', 'Palasa', 'Parvathipuram', 'Peddapuram', 'Rajahmundry', 'Ramachandrapuram', 'Ravulapalem', 'Srikakulam', 'Tadepalligudem', 'Tenali', 'Tirupati', 'Vijayawada', 'Vizag', 'Vizianagaram', 'Tawang', 'Ziro', 'Biswanath-Chariali', 'Dibrugarh', 'Guwahati', 'Jorhat', 'Karimganj', 'Mangaldoi', 'Nagaon', 'Silchar', 'Tinsukia', 'Gaya', 'Hajipur', 'Muzaffarpur', 'Patna', 'Purnea', 'Balod', 'Baloda-Bazar', 'Bhatapara', 'Bhilai', 'Bilaspur', 'Champa', 'Dhamtari', 'Durg', 'Jagdalpur', 'Kawardha', 'Kondagaon', 'Korba', 'Pendra', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sakti', 'Tilda-Neora', 'Goa', 'Adipur', 'Ahmedabad', 'Anand', 'Ankleshwar', 'Bardoli', 'Bharuch', 'Bhavnagar', 'Bilimora', 'Dahod', 'Daman', 'Deesa', 'Gandhidham', 'Gandhinagar', 'Himmatnagar', 'Idar', 'Jamnagar', 'Jetpur', 'Junagadh', 'Kadi', 'Kalol', 'Kosamba', 'Kutch', 'Nadiad', 'Navsari', 'Palanpur', 'Patan', 'Rajkot', 'Rajpipla', 'Sanand', 'Silvassa', 'Surat', 'Surendranagar', 'Vadodara', 'Valsad', 'Vapi', 'Ambala', 'Dharuhera', 'Faridabad', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar', 'Baddi', 'Baijnath', 'Dharamsala', 'Hamirpur', 'Kangra', 'Kullu', 'Manali', 'Mandi', 'Shimla', 'Solan', 'Jammu', 'Kathua', 'Katra', 'Ladakh', 'Leh', 'Srinagar', 'Bokaro', 'Deoghar', 'Dhanbad', 'Jamshedpur', 'Ranchi', 'Belagavi', 'Bengaluru', 'Bidar', 'Chikkaballapur', 'Chikmagalur', 'Coorg', 'Davangere', 'Gulbarga', 'Gundlupet', 'Hubli', 'Karwar', 'Madikeri', 'Mandya', 'Mangalore', 'Manipal', 'Mysore', 'Nagamangala', 'Tumkur', 'Udupi', 'Alappuzha', 'Anchal', 'Angamaly', 'Calicut', 'Ernakulam', 'Idukki', 'Kannur', 'Karunagapally', 'Kochi', 'Kollam', 'Kottayam', 'Mavellikara', 'Pattambi', 'Thalayolaparambu', 'Thrissur', 'Trivandrum', 'Vadakara', 'Ashoknagar', 'Balaghat', 'Betul', 'Bhopal', 'Chhindwara', 'Dewas', 'Gogawa', 'Guna', 'Gwalior', 'Harda', 'Indore', 'Jabalpur', 'Khandwa', 'Khargone', 'Kukshi', 'Mandsaur', 'Neemuch', 'Ratlam', 'Rewa', 'Sagar', 'Sarangpur', 'Sarni', 'Satna', 'Sehore', 'Seoni', 'Shivpuri', 'Ujjain', 'Ahmednagar', 'Akluj', 'Akola', 'Alibaug', 'Amalner', 'Amravati', 'Aurangabad', 'Baramati', 'Beed', 'Bhiwandi', 'Boisar', 'Buldana', 'Chandrapur', 'Dhule', 'Dhulia', 'Indapur', 'Jalgaon', 'Jalna', 'Jamner', 'Karad', 'Khed', 'Khopoli', 'Kolhapur', 'Latur', 'Lavasa', 'Lonavala', 'Mahad', 'Malegaon', 'Mumbai', 'Nagpur', 'Nanded', 'Nashik', 'Palghar', 'Panchgani', 'Paratwada', 'Parbhani', 'Pen', 'Phaltan', 'Pimpri', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Sangola', 'Satara', 'Selu', 'Shrirampur', 'Solapur', 'Tembhode', 'Udgir', 'Wardha', 'Warora', 'Yavatmal', 'Rongjeng', 'Shillong', 'Dimapur','Asika', 'Athagarh', 'Balasore', 'Banki', 'Bargarh', 'Baripada', 'Bhawanipatna', 'Bhubaneshwar', 'Cuttack', 'Jajpur Road', 'Jeypore', 'Jharsuguda', 'Keonjhar', 'Muniguda', 'Nimapara', 'Paralakhemundi', 'Puri', 'Rourkela', 'Sambalpur', 'Abohar', 'Ahmedgarh', 'Amritsar', 'Banga', 'Barnala', 'Bathinda', 'Chandigarh', 'Fatehgarh Sahib', 'Firozpur', 'Hoshiarpur', 'Jalandhar', 'Khanna', 'Kotkapura', 'Ludhiana', 'Malout', 'Mansa', 'Moga', 'Mohali', 'Morinda', 'Muktsar', 'Nawanshahr', 'Pathankot', 'Patiala', 'Patran', 'Rupnagar', 'Sangrur', 'Zirakpur', 'Abu Road', 'Ajmer', 'Alsisar', 'Alwar', 'Banswara', 'Beawar', 'Bharatpur', 'Bhilwara', 'Bhiwadi', 'Bikaner', 'Chirawa', 'Dausa', 'Jaipur', 'Jaisalmer', 'Jodhpur', 'Kishangarh', 'Kota', 'Neemrana', 'Pilani', 'Pratapgarh', 'Sagwara', 'Sikar', 'Sri Ganganagar', 'Udaipur', 'Gangtok', 'Ambur', 'Ariyalur', 'Arni', 'Aruppukottai', 'Bodinayakanur', 'Chennai', 'Chidambaram', 'Coimbatore', 'Cuddalore', 'Cumbum', 'Devakottai', 'Dharapuram', 'Dharmapuri', 'Dindigul', 'Erode', 'Gudiyatham', 'Kalakkadu', 'Kanchipuram', 'Komarapalayam', 'Krishnagiri', 'Kumbakonam', 'Madurai', 'Mettuppalayam', 'Nagapattinam', 'Natham', 'Oddanchatram', 'Ooty', 'Palani', 'Pattukkottai', 'Pollachi', 'Pondicherry', 'Pudhukottai', 'Ranipet', 'Salem', 'Sivagangai', 'Sivakasi', 'Tanjore', 'Tenkasi', 'Tiruchendur', 'Tirunelveli', 'Tirupattur', 'Tirupur', 'Trichy', 'Tuticorin', 'Vaniyambadi', 'Vellore', 'Adilabad', 'Amangal', 'Bhongir', 'Bhupalpalle', 'Bhuvanagiri', 'Cherla', 'Dubbaka', 'Godavarikhani', 'Husnabad', 'Huzurnagar', 'Hyderabad', 'Jadcherla', 'Kalwakurthy', 'Karimnagar', 'Kesamudram', 'Khammam', 'Kodad', 'Korutla', 'Kothagudem', 'Mahbubnagar', 'Mancherial', 'Manuguru', 'Marripeda', 'Medak', 'Miryalaguda', 'Mominpet', 'Nagarkurnool', 'Narayankhed', 'Nizamabad', 'Palvancha', 'Parigi', 'Peddapalli', 'Pochampally', 'Ramayampet', 'Sangareddy', 'Sathupally', 'Secunderabad', 'Shadnagar', 'Shankarpally', 'Siddipet', 'Suryapet', 'Tandur', 'Thirumalagiri', 'Vemulawada', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yellandu', 'Zaheerabad', 'Bangkok', 'Agartala', 'Agra', 'Aligarh', 'Allahabad', 'Bareilly', 'Bijnor', 'Etawah', 'Ghazipur', 'Gorakhpur', 'Jhansi', 'Kanpur', 'Kasgunj', 'Kushinagar', 'Lucknow', 'Mathura', 'Meerut', 'Moradabad', 'Mughalsarai', 'Muzaffarnagar', 'Pratapgarh', 'Renukoot', 'Saharanpur', 'Varanasi', 'Almora', 'Dehradun', 'Garhwal', 'Haldwani', 'Haridwar', 'Kanatal', 'Kashipur', 'Kichha', 'Kotdwara', 'Mussoorie', 'Nainital', 'Ramnagar', 'Rishikesh', 'Roorkee', 'Rudrapur', 'Sankri', 'Asansol', 'Berhampore', 'Bolpur', 'Burdwan', 'Cooch Behar', 'Darjeeling', 'Durgapur', 'Haldia', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Kalyani', 'Kolkata', 'Mandarmoni', 'Namkhana', 'Purulia', 'Ranaghat', 'Rishra', 'Siliguri'];
	var cityArr = ['Chennai', 'Coimbatore', 'Bengaluru', 'Pune', 'Kolkata', 'Mumbai', 'Trivandrum', 'Trichy', 'Madurai', 'Kochi', 'Ahmedabad', 'Nagpur', 'Vizag', 'Goa', 'Amalapuram','Anantapur', 'Bapatla','Bhimavaram','Chinnakakani','Chinnamandem', 'Chintalapudi', 'Chirala', 'Dharmavaram', 'Gudur', 'Guntakal', 'Guntur', 'Jangareddy-Gudem', 'Kakinada', 'Kavali', 'Kurnool', 'Macherla', 'Machilipatnam', 'Martur', 'Mylavaram', 'Narasaraopet', 'Narsapur', 'Narsipatnam', 'Palasa', 'Parvathipuram', 'Peddapuram', 'Rajahmundry', 'Ramachandrapuram', 'Ravulapalem', 'Srikakulam', 'Tadepalligudem', 'Tenali', 'Tirupati', 'Vijayawada', 'Vizianagaram', 'Tawang', 'Ziro', 'Biswanath-Chariali', 'Dibrugarh', 'Guwahati', 'Jorhat', 'Karimganj', 'Mangaldoi', 'Nagaon', 'Silchar', 'Tinsukia', 'Gaya', 'Hajipur', 'Muzaffarpur', 'Patna', 'Purnea', 'Balod', 'Baloda-Bazar', 'Bhatapara', 'Bhilai', 'Bilaspur', 'Champa', 'Dhamtari', 'Durg', 'Jagdalpur', 'Kawardha', 'Kondagaon', 'Korba', 'Pendra', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sakti', 'Tilda-Neora', 'Adipur', 'Anand', 'Ankleshwar', 'Bardoli', 'Bharuch', 'Bhavnagar', 'Bilimora', 'Dahod', 'Daman', 'Deesa', 'Gandhidham', 'Gandhinagar', 'Himmatnagar', 'Idar', 'Jamnagar', 'Jetpur', 'Junagadh', 'Kadi', 'Kalol', 'Kosamba', 'Kutch', 'Nadiad', 'Navsari', 'Palanpur', 'Patan', 'Rajkot', 'Rajpipla', 'Sanand', 'Silvassa', 'Surat', 'Surendranagar', 'Vadodara', 'Valsad', 'Vapi', 'Ambala', 'Dharuhera', 'Faridabad', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar', 'Baddi', 'Baijnath', 'Dharamsala', 'Hamirpur', 'Kangra', 'Kullu', 'Manali', 'Mandi', 'Shimla', 'Solan', 'Jammu', 'Kathua', 'Katra', 'Ladakh', 'Leh', 'Srinagar', 'Bokaro', 'Deoghar', 'Dhanbad', 'Jamshedpur', 'Ranchi', 'Belagavi', 'Bidar', 'Chikkaballapur', 'Chikmagalur', 'Coorg', 'Davangere', 'Gulbarga', 'Gundlupet', 'Hubli', 'Karwar', 'Madikeri', 'Mandya', 'Mangalore', 'Manipal', 'Mysore', 'Nagamangala', 'Tumkur', 'Udupi', 'Alappuzha', 'Anchal', 'Angamaly', 'Calicut', 'Ernakulam', 'Idukki', 'Kannur', 'Karunagapally', 'Kollam', 'Kottayam', 'Mavellikara', 'Pattambi', 'Thalayolaparambu', 'Thrissur', 'Vadakara', 'Ashoknagar', 'Balaghat', 'Betul', 'Bhopal', 'Chhindwara', 'Dewas', 'Gogawa', 'Guna', 'Gwalior', 'Harda', 'Indore', 'Jabalpur', 'Khandwa', 'Khargone', 'Kukshi', 'Mandsaur', 'Neemuch', 'Ratlam', 'Rewa', 'Sagar', 'Sarangpur', 'Sarni', 'Satna', 'Sehore', 'Seoni', 'Shivpuri', 'Ujjain', 'Ahmednagar', 'Akluj', 'Akola', 'Alibaug', 'Amalner', 'Amravati', 'Aurangabad', 'Baramati', 'Beed', 'Bhiwandi', 'Boisar', 'Buldana', 'Chandrapur', 'Dhule', 'Dhulia', 'Indapur', 'Jalgaon', 'Jalna', 'Jamner', 'Karad', 'Khed', 'Khopoli', 'Kolhapur', 'Latur', 'Lavasa', 'Lonavala', 'Mahad', 'Malegaon', 'Nanded', 'Nashik', 'Palghar', 'Panchgani', 'Paratwada', 'Parbhani', 'Pen', 'Phaltan', 'Pimpri', 'Raigad', 'Ratnagiri', 'Sangli', 'Sangola', 'Satara', 'Selu', 'Shrirampur', 'Solapur', 'Tembhode', 'Udgir', 'Wardha', 'Warora', 'Yavatmal', 'Rongjeng', 'Shillong', 'Dimapur','Asika', 'Athagarh', 'Balasore', 'Banki', 'Bargarh', 'Baripada', 'Bhawanipatna', 'Bhubaneshwar', 'Cuttack', 'Jajpur-Road', 'Jeypore', 'Jharsuguda', 'Keonjhar', 'Muniguda', 'Nimapara', 'Paralakhemundi', 'Puri', 'Rourkela', 'Sambalpur', 'Abohar', 'Ahmedgarh', 'Amritsar', 'Banga', 'Barnala', 'Bathinda', 'Chandigarh', 'Fatehgarh-Sahib', 'Firozpur', 'Hoshiarpur', 'Jalandhar', 'Khanna', 'Kotkapura', 'Ludhiana', 'Malout', 'Mansa', 'Moga', 'Mohali', 'Morinda', 'Muktsar', 'Nawanshahr', 'Pathankot', 'Patiala', 'Patran', 'Rupnagar', 'Sangrur', 'Zirakpur', 'Abu-Road', 'Ajmer', 'Alsisar', 'Alwar', 'Banswara', 'Beawar', 'Bharatpur', 'Bhilwara', 'Bhiwadi', 'Bikaner', 'Chirawa', 'Dausa', 'Jaipur', 'Jaisalmer', 'Jodhpur', 'Kishangarh', 'Kota', 'Neemrana', 'Pilani', 'Pratapgarh', 'Sagwara', 'Sikar', 'Sri-Ganganagar', 'Udaipur', 'Gangtok', 'Ambur', 'Ariyalur', 'Arni', 'Aruppukottai', 'Bodinayakanur', 'Chidambaram', 'Cuddalore', 'Cumbum', 'Devakottai', 'Dharapuram', 'Dharmapuri', 'Dindigul', 'Erode', 'Gudiyatham', 'Kalakkadu', 'Kanchipuram', 'Komarapalayam', 'Krishnagiri', 'Kumbakonam', 'Mettuppalayam', 'Nagapattinam', 'Natham', 'Oddanchatram', 'Ooty', 'Palani', 'Pattukkottai', 'Pollachi', 'Pondicherry', 'Pudhukottai', 'Ranipet', 'Salem', 'Sivagangai', 'Sivakasi', 'Tanjore', 'Tenkasi', 'Tiruchendur', 'Tirunelveli', 'Tirupattur', 'Tirupur', 'Tuticorin', 'Vaniyambadi', 'Vellore', 'Adilabad', 'Amangal', 'Bhongir', 'Bhupalpalle', 'Bhuvanagiri', 'Cherla', 'Dubbaka', 'Godavarikhani', 'Husnabad', 'Huzurnagar', 'Hyderabad', 'Jadcherla', 'Kalwakurthy', 'Karimnagar', 'Kesamudram', 'Khammam', 'Kodad', 'Korutla', 'Kothagudem', 'Mahbubnagar', 'Mancherial', 'Manuguru', 'Marripeda', 'Medak', 'Miryalaguda', 'Mominpet', 'Nagarkurnool', 'Narayankhed', 'Nizamabad', 'Palvancha', 'Parigi', 'Peddapalli', 'Pochampally', 'Ramayampet', 'Sangareddy', 'Sathupally', 'Secunderabad', 'Shadnagar', 'Shankarpally', 'Siddipet', 'Suryapet', 'Tandur', 'Thirumalagiri', 'Vemulawada', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yellandu', 'Zaheerabad', 'Bangkok', 'Agartala', 'Agra', 'Aligarh', 'Allahabad', 'Bareilly', 'Bijnor', 'Etawah', 'Ghazipur', 'Gorakhpur', 'Jhansi', 'Kanpur', 'Kasgunj', 'Kushinagar', 'Lucknow', 'Mathura', 'Meerut', 'Moradabad', 'Mughalsarai', 'Muzaffarnagar', 'Pratapgarh', 'Renukoot', 'Saharanpur', 'Varanasi', 'Almora', 'Dehradun', 'Garhwal', 'Haldwani', 'Haridwar', 'Kanatal', 'Kashipur', 'Kichha', 'Kotdwara', 'Mussoorie', 'Nainital', 'Ramnagar', 'Rishikesh', 'Roorkee', 'Rudrapur', 'Sankri', 'Asansol', 'Berhampore', 'Bolpur', 'Burdwan', 'Cooch-Behar', 'Darjeeling', 'Durgapur', 'Haldia', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Kalyani', 'Mandarmoni', 'Namkhana', 'Purulia', 'Ranaghat', 'Rishra', 'Siliguri','national-capital-region-ncr'];

	// var cityArr = city.slice(0,300);
	//cityArr = ['Adipur','Hyderabad','Allahabad'];
	var cityData={};
	var movieList;
	var cinemaList;
	async.eachSeries(cityArr,this.processCity.bind(this),function(err){
		var data = memoryCache.getAll();
		var len = Object.keys(data).length;
		console.log('Processing done for '+ len);
		console.log('******************************');
		console.log('*\tEverything done\t*');
		console.log('******************************');
		if(config.NODE_ENV.toLowerCase() == "dev") {
			var dataString = JSON.stringify(data);
			client.set('data',dataString,function(err,response){
				if(err) {
					console.log('Error storing in redis:==> '+err);
				} else {
					console.log('done storing in redis:==> '+response);
				}
			});	
		}
		global.gc();
	});
}

dataProcessor.prototype.processCity = function(city,callback){
	// var self = this;
	this.callback = callback;
	async.series([
		this.getMovies.bind(null,city),
		this.getCinemas.bind(null,city)
	],this.updateRegistry.bind(this,city));
}

dataProcessor.prototype.updateRegistry = function(city,err,finalData){
	if(err) {
		return this.callback(err);
		console.log(err+"\n while processing\t"+city);
	}
	else {
		/*var data={};
		data.movieList = finalData[0];
		data.cinemaList = finalData[1];*/
		if(Object.keys(finalData[0]).length == 0)
			console.log("Empty movies for city =======>"+ city);
		if(finalData[0].length == 0)
			console.log("Empty cinemas for city =======>"+ city);
		var scrappedData = {};
		scrappedData.movieList = finalData[0];
		scrappedData.cinemaList = finalData[1];
		var data = "";
		data = JSON.stringify(scrappedData);
		memoryCache.set(city,data);
		this.callback();
	}
}

dataProcessor.prototype.getMovies = function(city,callback){
	getMoviesCtrl(city.toLowerCase(),function(err,data){
		if(err) return callback(err);
		if(data==null || data==undefined || Object.keys(data).length==0) console.log('No Movie data for '+city);
		console.log('Movies processed for '+city)
		callback(null,data);
	});
}

dataProcessor.prototype.getCinemas = function(city,callback) {
	getCinemasCtrl(city.toLowerCase(),function(err,data){
		if(err) return callback(err);
		if(data.length == 0) console.log('No cinemas data for '+city);
		console.log('Cinemas processed for'+ city)
		callback(null,data);
	});
}

module.exports = dataProcessor;