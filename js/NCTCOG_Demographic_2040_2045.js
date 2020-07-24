(function () {
    // Create the connector object
    var myConnector = tableau.makeConnector();


    // Define the schema
    myConnector.getSchema = function(schemaCallback) 
	{   
		var cols2040tsz = [{id: "ID",dataType: tableau.dataTypeEnum.int}, 
			{id: "TSZ",dataType: tableau.dataTypeEnum.float}, 
			{id: "County",dataType: tableau.dataTypeEnum.string},
			{id: "HH40",dataType: tableau.dataTypeEnum.int}, 
			{id: "HHPOP40",dataType: tableau.dataTypeEnum.int}, 
			{id: "EMP40",dataType: tableau.dataTypeEnum.int}
			];
			
        var tableSchema2040tsz = {
            id: "NCTCOG2040tsz",
            alias: "NCTCOG 2040 Demographic TSZ",
			columns: cols2040tsz
			};
		
		var cols2040dst = [{id: "ID",dataType: tableau.dataTypeEnum.int}, 
			{id: "District",dataType: tableau.dataTypeEnum.int}, 
			{id: "County",dataType: tableau.dataTypeEnum.string},
			{id: "HH40",dataType: tableau.dataTypeEnum.int}, 
			{id: "HHPOP40",dataType: tableau.dataTypeEnum.int}, 
			{id: "EMP40",dataType: tableau.dataTypeEnum.int}
			];
			
        var tableSchema2040dst = {
            id: "NCTCOG2040dst",
            alias: "NCTCOG 2040 Demographic District",
			columns: cols2040dst
			};		
			
		var cols2045tsz = [{id: "ID",dataType: tableau.dataTypeEnum.int}, 
			{id: "TSZ",dataType: tableau.dataTypeEnum.float}, 
			{id: "County",dataType: tableau.dataTypeEnum.string},
			{id: "HH45",dataType: tableau.dataTypeEnum.int}, 
			{id: "HHPOP45",dataType: tableau.dataTypeEnum.int}, 
			{id: "EMP45",dataType: tableau.dataTypeEnum.int}
			];
			
        var tableSchema2045tsz = {
            id: "NCTCOG2045tsz",
            alias: "NCTCOG 2045 Demographic TSZ",
            columns: cols2045tsz
			};
			
		var cols2020cty = [{id: "GEOID10",dataType: tableau.dataTypeEnum.int}, 
			{id: "CityName",dataType: tableau.dataTypeEnum.string},
			{id: "CenPop10",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop11",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop12",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop13",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop14",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop15",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop16",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop17",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop18",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop19",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop20",dataType: tableau.dataTypeEnum.int}
			];
			
        var tableSchema2020cty = {
            id: "NCTCOG2020cty",
            alias: "NCTCOG 2020 Population City",
			columns: cols2020cty
			};	
			
		var cols2020cnty = [{id: "GEOID10",dataType: tableau.dataTypeEnum.int}, 
			{id: "CountyName",dataType: tableau.dataTypeEnum.string},
			{id: "CNTYCODE",dataType: tableau.dataTypeEnum.int}, 
			{id: "CenPop10",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop11",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop12",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop13",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop14",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop15",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop16",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop17",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop18",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop19",dataType: tableau.dataTypeEnum.int}, 
			{id: "COGPop20",dataType: tableau.dataTypeEnum.int}
			];
			
        var tableSchema2020cnty = {
            id: "NCTCOG2020cnty",
            alias: "NCTCOG 2020 Population County",
			columns: cols2020cnty
			};	

        schemaCallback([tableSchema2040tsz,tableSchema2040dst,tableSchema2045tsz,tableSchema2020cty, tableSchema2020cnty]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback){	
	
		if (table.tableInfo.id == "NCTCOG2040tsz"){			
			var apiCall = "https://opendata.arcgis.com/datasets/6e99f37880d845758788c18f5a2c36f2_10.geojson"
		}
		
		if (table.tableInfo.id == "NCTCOG2040dst"){			
			var apiCall = "https://opendata.arcgis.com/datasets/2cf1152dce1046999ab07d6634a67ec8_9.geojson"
		}
		
		if (table.tableInfo.id == "NCTCOG2045tsz"){			
			var apiCall = "https://opendata.arcgis.com/datasets/c8ab64bc19eb4878b659bdf50710c036_11.geojson"
		}
		
		if (table.tableInfo.id == "NCTCOG2020cty"){			
			var apiCall = "https://opendata.arcgis.com/datasets/c572d59f296b43bdaea9b08151ab9456_12.geojson"
		}
		
		if (table.tableInfo.id == "NCTCOG2020cnty"){			
			var apiCall = "https://opendata.arcgis.com/datasets/9e3405a149cb4e76a8ae52287f941a6b_13.geojson"
		}

	
		$.getJSON(apiCall, function(resp) {
			var feat = resp.features,
			tableData = [];
			
			if (table.tableInfo.id == "NCTCOG2040tsz"){	
				// Iterate over the JSON object
				for (var i = 0, len = feat.length; i < len; i++) {
					tableData.push
					({
						"ID": feat[i].properties.OID,
						"TSZ": feat[i].properties.TSZ,
						"County": feat[i].properties.County,
						"HH40": feat[i].properties.HH40,
						"HHPOP40": feat[i].properties.HHPOP40,
						"EMP40": feat[i].properties.EMP40
					});
				}
			}
			
			if (table.tableInfo.id == "NCTCOG2040dst"){	
				// Iterate over the JSON object
				for (var i = 0, len = feat.length; i < len; i++) {
					tableData.push
					({
						"ID": feat[i].properties.Recid,
						"District": feat[i].properties.GLUM_DISTR,
						"County": feat[i].properties.County,
						"HH40": feat[i].properties.HH40,
						"HHPOP40": feat[i].properties.HHPOP40,
						"EMP40": feat[i].properties.EMP40
					});
				}
			}

			if (table.tableInfo.id == "NCTCOG2045tsz"){	
				// Iterate over the JSON object
				for (var i = 0, len = feat.length; i < len; i++) {
					tableData.push
					({
						"ID": feat[i].properties.OID,
						"TSZ": feat[i].properties.TSZ,
						"County": feat[i].properties.County,
						"HH45": feat[i].properties.HH45,
						"HHPOP45": feat[i].properties.HHPop45,
						"EMP45": feat[i].properties.EMP45
					});
				}
			}		
			
			if (table.tableInfo.id == "NCTCOG2020cty"){	
				for (var i = 0, len = feat.length; i < len; i++) {
					tableData.push
					({	"GEOID10": feat[i].properties.GEOID10,
						"CityName": feat[i].properties.CityName,
						"CenPop10": feat[i].properties.CenPop10,
						"COGPop11": feat[i].properties.COGPop11,
						"COGPop12": feat[i].properties.COGPop12,
						"COGPop13": feat[i].properties.COGPop13,
						"COGPop14": feat[i].properties.COGPop14,
						"COGPop15": feat[i].properties.COGPop15,
						"COGPop16": feat[i].properties.COGPop16,
						"COGPop17": feat[i].properties.COGPop17,
						"COGPop18": feat[i].properties.COGPop18,
						"COGPop19": feat[i].properties.COGPop19,
						"COGPop20": feat[i].properties.COGPop20
					});
				}
			}
			
			if (table.tableInfo.id == "NCTCOG2020cnty"){	
				for (var i = 0, len = feat.length; i < len; i++) {
					tableData.push
					({	"GEOID10": feat[i].properties.GEOID10,
						"CountyName": feat[i].properties.CountyName,
						"CNTYCODE": feat[i].properties.CNTYCODE,
						"CenPop10": feat[i].properties.CenPop10,
						"COGPop11": feat[i].properties.COGPop11,
						"COGPop12": feat[i].properties.COGPop12,
						"COGPop13": feat[i].properties.COGPop13,
						"COGPop14": feat[i].properties.COGPop14,
						"COGPop15": feat[i].properties.COGPop15,
						"COGPop16": feat[i].properties.COGPop16,
						"COGPop17": feat[i].properties.COGPop17,
						"COGPop18": feat[i].properties.COGPop18,
						"COGPop19": feat[i].properties.COGPop19,
						"COGPop20": feat[i].properties.COGPop20
					});
				}
			}
		
			table.appendRows(tableData);
			doneCallback();
        });
    };	
		
	tableau.registerConnector(myConnector);
		
			
    // Create event listeners for when the user submits the form
    $(document).ready(function () {
        $("#Button202020402045DEMOTSZ").click(function () {
            tableau.connectionName = "NCTCOG Demographic 2020/2040/2045"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
