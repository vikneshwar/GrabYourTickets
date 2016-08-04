$(function() {
    var city = ['Amalapuram', 'Anantapur', 'Bapatla', 'Bhimavaram', 'Chinnakakani', 'Chinnamandem', 'Chintalapudi', 'Chirala', 'Dharmavaram', 'Gudur', 'Guntakal', 'Guntur', 'Jangareddy-Gudem', 'Kakinada', 'Kavali', 'Kurnool', 'Macherla', 'Machilipatnam', 'Martur', 'Mylavaram', 'Narasaraopet', 'Narsapur', 'Narsipatnam', 'Palasa', 'Parvathipuram', 'Peddapuram', 'Rajahmundry', 'Ramachandrapuram', 'Ravulapalem', 'Srikakulam', 'Tadepalligudem', 'Tenali', 'Tirupati', 'Vijayawada', 'Vizag', 'Vizianagaram', 'Tawang', 'Ziro', 'Biswanath-Chariali', 'Dibrugarh', 'Guwahati', 'Jorhat', 'Karimganj', 'Mangaldoi', 'Nagaon', 'Silchar', 'Tinsukia', 'Gaya', 'Hajipur', 'Muzaffarpur', 'Patna', 'Purnea', 'Balod', 'Baloda-Bazar', 'Bhatapara', 'Bhilai', 'Bilaspur', 'Champa', 'Dhamtari', 'Durg', 'Jagdalpur', 'Kawardha', 'Kondagaon', 'Korba', 'Pendra', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sakti', 'Tilda-Neora', 'Goa', 'Adipur', 'Ahmedabad', 'Anand', 'Ankleshwar', 'Bardoli', 'Bharuch', 'Bhavnagar', 'Bilimora', 'Dahod', 'Daman', 'Deesa', 'Gandhidham', 'Gandhinagar', 'Himmatnagar', 'Idar', 'Jamnagar', 'Jetpur', 'Junagadh', 'Kadi', 'Kalol', 'Kosamba', 'Kutch', 'Nadiad', 'Navsari', 'Palanpur', 'Patan', 'Rajkot', 'Rajpipla', 'Sanand', 'Silvassa', 'Surat', 'Surendranagar', 'Vadodara', 'Valsad', 'Vapi', 'Ambala', 'Dharuhera', 'Faridabad', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar', 'Baddi', 'Baijnath', 'Dharamsala', 'Hamirpur', 'Kangra', 'Kullu', 'Manali', 'Mandi', 'Shimla', 'Solan', 'Jammu', 'Kathua', 'Katra', 'Ladakh', 'Leh', 'Srinagar', 'Bokaro', 'Deoghar', 'Dhanbad', 'Jamshedpur', 'Ranchi', 'Belagavi', 'Bengaluru', 'Bidar', 'Chikkaballapur', 'Chikmagalur', 'Coorg', 'Davangere', 'Gulbarga', 'Gundlupet', 'Hubli', 'Karwar', 'Madikeri', 'Mandya', 'Mangalore', 'Manipal', 'Mysore', 'Nagamangala', 'Tumkur', 'Udupi', 'Alappuzha', 'Anchal', 'Angamaly', 'Calicut', 'Ernakulam', 'Idukki', 'Kannur', 'Karunagapally', 'Kochi', 'Kollam', 'Kottayam', 'Mavellikara', 'Pattambi', 'Thalayolaparambu', 'Thrissur', 'Trivandrum', 'Vadakara', 'Ashoknagar', 'Balaghat', 'Betul', 'Bhopal', 'Chhindwara', 'Dewas', 'Gogawa', 'Guna', 'Gwalior', 'Harda', 'Indore', 'Jabalpur', 'Khandwa', 'Khargone', 'Kukshi', 'Mandsaur', 'Neemuch', 'Ratlam', 'Rewa', 'Sagar', 'Sarangpur', 'Sarni', 'Satna', 'Sehore', 'Seoni', 'Shivpuri', 'Ujjain', 'Ahmednagar', 'Akluj', 'Akola', 'Alibaug', 'Amalner', 'Amravati', 'Aurangabad', 'Baramati', 'Beed', 'Bhiwandi', 'Boisar', 'Buldana', 'Chandrapur', 'Dhule', 'Dhulia', 'Indapur', 'Jalgaon', 'Jalna', 'Jamner', 'Karad', 'Khed', 'Khopoli', 'Kolhapur', 'Latur', 'Lavasa', 'Lonavala', 'Mahad', 'Malegaon', 'Mumbai', 'Nagpur', 'Nanded', 'Nashik', 'Palghar', 'Panchgani', 'Paratwada', 'Parbhani', 'Pen', 'Phaltan', 'Pimpri', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Sangola', 'Satara', 'Selu', 'Shrirampur', 'Solapur', 'Tembhode', 'Udgir', 'Wardha', 'Warora', 'Yavatmal', 'Rongjeng', 'Shillong', 'Dimapur', 'Asika', 'Athagarh', 'Balasore', 'Banki', 'Bargarh', 'Baripada', 'Bhawanipatna', 'Bhubaneshwar', 'Cuttack', 'Jajpur Road', 'Jeypore', 'Jharsuguda', 'Keonjhar', 'Muniguda', 'Nimapara', 'Paralakhemundi', 'Puri', 'Rourkela', 'Sambalpur', 'Abohar', 'Ahmedgarh', 'Amritsar', 'Banga', 'Barnala', 'Bathinda', 'Chandigarh', 'Fatehgarh Sahib', 'Firozpur', 'Hoshiarpur', 'Jalandhar', 'Khanna', 'Kotkapura', 'Ludhiana', 'Malout', 'Mansa', 'Moga', 'Mohali', 'Morinda', 'Muktsar', 'Nawanshahr', 'Pathankot', 'Patiala', 'Patran', 'Rupnagar', 'Sangrur', 'Zirakpur', 'Abu Road', 'Ajmer', 'Alsisar', 'Alwar', 'Banswara', 'Beawar', 'Bharatpur', 'Bhilwara', 'Bhiwadi', 'Bikaner', 'Chirawa', 'Dausa', 'Jaipur', 'Jaisalmer', 'Jodhpur', 'Kishangarh', 'Kota', 'Neemrana', 'Pilani', 'Pratapgarh', 'Sagwara', 'Sikar', 'Sri Ganganagar', 'Udaipur', 'Gangtok', 'Ambur', 'Ariyalur', 'Arni', 'Aruppukottai', 'Bodinayakanur', 'Chennai', 'Chidambaram', 'Coimbatore', 'Cuddalore', 'Cumbum', 'Devakottai', 'Dharapuram', 'Dharmapuri', 'Dindigul', 'Erode', 'Gudiyatham', 'Kalakkadu', 'Kanchipuram', 'Komarapalayam', 'Krishnagiri', 'Kumbakonam', 'Madurai', 'Mettuppalayam', 'Nagapattinam', 'Natham', 'Oddanchatram', 'Ooty', 'Palani', 'Pattukkottai', 'Pollachi', 'Pondicherry', 'Pudhukottai', 'Ranipet', 'Salem', 'Sivagangai', 'Sivakasi', 'Tanjore', 'Tenkasi', 'Tiruchendur', 'Tirunelveli', 'Tirupattur', 'Tirupur', 'Trichy', 'Tuticorin', 'Vaniyambadi', 'Vellore', 'Adilabad', 'Amangal', 'Bhongir', 'Bhupalpalle', 'Bhuvanagiri', 'Cherla', 'Dubbaka', 'Godavarikhani', 'Husnabad', 'Huzurnagar', 'Hyderabad', 'Jadcherla', 'Kalwakurthy', 'Karimnagar', 'Kesamudram', 'Khammam', 'Kodad', 'Korutla', 'Kothagudem', 'Mahbubnagar', 'Mancherial', 'Manuguru', 'Marripeda', 'Medak', 'Miryalaguda', 'Mominpet', 'Nagarkurnool', 'Narayankhed', 'Nizamabad', 'Palvancha', 'Parigi', 'Peddapalli', 'Pochampally', 'Ramayampet', 'Sangareddy', 'Sathupally', 'Secunderabad', 'Shadnagar', 'Shankarpally', 'Siddipet', 'Suryapet', 'Tandur', 'Thirumalagiri', 'Vemulawada', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yellandu', 'Zaheerabad', 'Bangkok', 'Agartala', 'Agra', 'Aligarh', 'Allahabad', 'Bareilly', 'Bijnor', 'Etawah', 'Ghazipur', 'Gorakhpur', 'Jhansi', 'Kanpur', 'Kasgunj', 'Kushinagar', 'Lucknow', 'Mathura', 'Meerut', 'Moradabad', 'Mughalsarai', 'Muzaffarnagar', 'Pratapgarh', 'Renukoot', 'Saharanpur', 'Varanasi', 'Almora', 'Dehradun', 'Garhwal', 'Haldwani', 'Haridwar', 'Kanatal', 'Kashipur', 'Kichha', 'Kotdwara', 'Mussoorie', 'Nainital', 'Ramnagar', 'Rishikesh', 'Roorkee', 'Rudrapur', 'Sankri', 'Asansol', 'Berhampore', 'Bolpur', 'Burdwan', 'Cooch Behar', 'Darjeeling', 'Durgapur', 'Haldia', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Kalyani', 'Kolkata', 'Mandarmoni', 'Namkhana', 'Purulia', 'Ranaghat', 'Rishra', 'Siliguri'];
    var yesterday = new Date((new Date()).valueOf() - 1000*60*60*24) 
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15,
        onClose: function() {
            $(document.activeElement).blur();
        },
        disable: [
            {
                from: [0,0,0],
                to: yesterday
            }
        ]
    });



    var cityEngine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: city
    });

    var city_typeahead = $('#city').typeahead({
        hint: false,
        highlight: true,
        minLength: 1
    }, {
        name: 'city',
        source: cityEngine,
        displaykey: 'city'

    });

    city_typeahead.unwrap();

    var movies = [];


    var movieEngine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: movies
    });

    var cinemaEngine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('cinema'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: [],
        identify: function(obj) {
                return obj.cinema;
            }
            /*prefetch: {
                url: 'citynames.json',
                filter: function(data){
                    return $.map(data,(city) => {
                        return {name: city};
                    });
                }
            }*/
    });

    cinemaEngine.initialize();
    var cinema_typeahead = $('#cinemas').materialtags({
        freeInput: false,
        itemValue: 'code',
        itemText: 'cinema',
        typeaheadjs: {
            highlight: true,
            name: 'cinema',
            displayKey: 'cinema',
            source: cinemaEngine
        }
    });

    var cinemaList = [];
    $('#city').on('blur', function(ev) {
        if ($(ev.target).val().trim() == "")
            $('#city_error').html("Please select a city");
        else {
            cinemaEngine.clear();
            movieEngine.clear();
            $('#city_error').html("");
            var jqxhr = $.ajax({
                url: '/movie',
                method: 'GET',
                data: {
                    'city': $('#city').val()
                }
            });
            jqxhr.done(function(data) {
                if(data.hasOwnProperty("error") && data.error != undefined)
                    $('#errorModal').openModal();
                else {
                    movieEngine.add(Object.keys(data.movieList));
                    /*var theaters=[];
                    data.cinemaList.forEach(function(item,index){
                        theaters.push(item.cinema);
                    });*/
                    data.cinemaList.forEach(function(item,index){
                        item.code = item.type + "-" + item.code;
                    });
                    cinemaList = data.cinemaList;
                    cinemaEngine.add(data.cinemaList);    
                }
                
            });
        }
        console.log("city changed");
    });


    var movie_typeahead = $('#movie').typeahead({
        hint: false,
        highlight: true,
        minLength: 1
    }, {
        source: movieEngine
    });

    movie_typeahead.unwrap();


    /*cinema_typeahead[0].$element.unwrap();
    cinema_typeahead[0].$element.unwrap();*/
    //$('#theater').find('.materialize-tags').replaceWith($('#theater').find('.twitter-typeahead').html());
    $('#reg_form').submit(function(event) {
        if(isValidateFields()) {
            return true;
        } 
        return false;
    });
    $('#city_error,#movie_error,#cinemas_error,#date_error,#name_error,#email_mobile_error').on('blur',function(e){

    });
    function isValidateFields() {
        var flag = true;
        $('#city_error,#movie_error,#cinemas_error,#date_error,#name_error,#email_mobile_error').html("");
        if ($('#city').val() == "") {
            $('#city_error').html("Please select a city");
            flag = false;
        }
        if ($('#movie').val() == "") {
            $('#movie_error').html("Please select a movie");
            flag = false;
        }
        if ($('#cinemas').val() == "") {
            $('#cinemas_error').html("Please select a Cinemas");
            flag = false;
        }
        if ($('#date').val() == "") {
            $('#date_error').html('Please select a Show Date');
            flag = false;
        }
        if ($('#name').val() == "") {
            $('#name_error').html('Please provide a name');
            flag = false;
        }
        if ($('#mobile').val() == "" && $('#email').val() == "") {
            $('#email_mobile_error').html('Please provide a Email or Phone No');
            flag = false;
        }
        return flag;
    }
});

$('#cinemas').siblings('.materialize-tags').find('input:first').on('focus', function(evt) {
    $(evt.target).siblings('i').addClass('active');
});
