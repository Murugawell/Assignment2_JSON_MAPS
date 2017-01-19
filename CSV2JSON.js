var fs=require('fs');
var inputstream=fs.createReadStream('FoodFacts.csv');
var data="";
var obj={};
inputstream.on('data', function(line) {
    data+=line;
});
inputstream.on('end', function() {
    var noofrecords=data.split("\n");
    var nameofheaders=noofrecords[0].split(",");
    var index_country=nameofheaders.indexOf("countries_en");
    var index_salt=nameofheaders.indexOf("salt_100g");
    var index_sugar=nameofheaders.indexOf("sugars_100g");
    var salt_sugar_consp=[];
    var country_Array = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
    var saltArray=new Array(9).fill(0);
		var sugarArray=new Array(9).fill(0);


		//for fat protein carbohydrate	
		var	index_protein = nameofheaders.indexOf("proteins_100g");
		var index_carbohydrate = nameofheaders.indexOf("carbohydrates_100g");
		var index_fat = nameofheaders.indexOf("fat_100g");

    var country_Array_NorthEurope = ['United Kingdom', 'Denmark', 'Sweden','Norway'];
		var country_Array_CentralEurope = ['France', 'Belgium', 'Germany', 'Switzerland','Netherlands'];
		var country_Array_SouthEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia','Albania'];

		var fat_protein_carbohydrate_consp=[];
		var fat_North=0;
		var protein_North=0;
		var carbohydrate_North=0;
		var fat_Central=0;
		var protein_Central=0;
		var carbohydrate_Central=0;
		var fat_South=0;
		var protein_South=0;
		var carbohydrate_South=0;
		var fat;
		var protein;
		var carbohydrate;
    var checkcountryavailable;
		for(var i=0;i<noofrecords.length;i++)
		{
			var temprecord=noofrecords[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
		  checkcountryavailable=country_Array.includes(temprecord[index_country]);
			if(checkcountryavailable)
			{
				var index = country_Array.indexOf(temprecord[index_country]);
				var salt = temprecord[index_salt];
				var sugar=temprecord[index_sugar];
				if(salt=="")
				salt=0;
				if(sugar=="")
				sugar=0;
				saltArray[index] = saltArray[index]+parseFloat(salt);
			  sugarArray[index] = sugarArray[index]+parseFloat(sugar);
				checkcountryavailable = false;
			}
			checkcountryavailable=country_Array_NorthEurope.includes(temprecord[index_country]);
			if(checkcountryavailable)
			{
				fat = temprecord[index_fat];
				protein=temprecord[index_protein];
				carbohydrate=temprecord[index_carbohydrate];
				if(fat=="")
					fat=0;
				if(carbohydrate=="")
					carbohydrate=0;
				if(protein=="")
					protein=0;
			fat_North+=parseFloat(fat);
			carbohydrate_North+=parseFloat(carbohydrate);
			protein_North+=parseFloat(protein);
			checkcountryavailable = false;
			}
			checkcountryavailable=country_Array_CentralEurope.includes(temprecord[index_country]);
			if(checkcountryavailable)
			{
				fat = temprecord[index_fat];
				protein=temprecord[index_protein];
				carbohydrate=temprecord[index_carbohydrate];
				if(fat=="")
					fat=0;
				if(carbohydrate=="")
					carbohydrate=0;
				if(protein=="")
					protein=0;
			fat_Central+=parseFloat(fat);
			carbohydrate_Central+=parseFloat(carbohydrate);
			protein_Central+=parseFloat(protein);
			checkcountryavailable = false;
			}
			checkcountryavailable=country_Array_SouthEurope.includes(temprecord[index_country]);
			if(checkcountryavailable)
			{
				fat = temprecord[index_fat];
				protein=temprecord[index_protein];
				carbohydrate=temprecord[index_carbohydrate];
				if(fat=="")
					fat=0;
				if(carbohydrate=="")
					carbohydrate=0;
				if(protein=="")
					protein=0;
			fat_South+=parseFloat(fat);
			carbohydrate_South+=parseFloat(carbohydrate);
			protein_South+=parseFloat(protein);
			checkcountryavailable = false;
			}

		}
		for(var i=0;i<country_Array.length;i++)
		{
		var object = {};
		object["countryname"] = country_Array[i];
		object["saltconsumption"] = saltArray[i];
		object["sugarconsumption"] = sugarArray[i];
		salt_sugar_consp.push(object);
		}
		var obj={};
		obj["country"] = "NorthEurope";
	  obj["Fat"] = fat_North;
	  obj["Protien"] = protein_North;
	  obj["Carbohydrates"] = carbohydrate_North;
	  fat_protein_carbohydrate_consp.push(obj);

	  obj={};
	  obj["country"] = "CentralEurope";
	  obj["Fat"] = fat_Central;
	  obj["Protien"] = protein_Central;
	  obj["Carbohydrates"] = carbohydrate_Central;
	  fat_protein_carbohydrate_consp.push(obj);


	  obj["country"] = "southEurope";
	  obj["Fat"] = fat_South;
	  obj["Protien"] = protein_South;
	  obj["Carbohydrates"] = carbohydrate_South;
	  fat_protein_carbohydrate_consp.push(obj);






	fs.writeFile('saltsugar.json', JSON.stringify(salt_sugar_consp) , 'utf-8');
	fs.writeFile('fatproteincarbohydrate.json', JSON.stringify(fat_protein_carbohydrate_consp) , 'utf-8');

	console.log("done")
  });