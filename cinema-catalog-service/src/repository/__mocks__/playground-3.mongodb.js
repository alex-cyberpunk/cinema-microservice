// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('cinema-catalog-service');
const cinemaCatalog =[
  {
    "cidade": "Campinas",
    "uf": "SP",
    "pais": "BR",
    "cinemas": []
  }  
  ,{
    "cidade":"Sao Paulo",
    "uf":"SP",
    "pais":"BR",
    "cinemas":[{
      "_id":  ObjectId(),
            "nome":"Cinemark Bourbon Ipiranga",
            "salas":[{
                  "nome":1,
                  "sessoes":[
                    {
                      "idFilme":  ObjectId("6539cf325d3eaf6f403515e5"),
                      "filme": "Os Vingadores Guerra Infinita",
                      "data": ISODate("2023-10-11T13:00:00Z"),
                      "valor":25.00,
                      "assentos":[{
                        "numero":"A1",
                        "disponivel":true
                                  },
                                  {
                                    "numero":"A2",
                                    "disponivel":false
                                  }
                                  ]
                    },
                    {
                      "idFilme":  ObjectId("6539cf325d3eaf6f403515e5"),
                      "filme": "Os Vingadores Guerra Infinita",
                      "data": ISODate("2023-10-10T12:00:00Z"),
                      "valor":25.00,
                      "assentos":[{
                                "numero":"A1",
                                "disponivel":true
                                },
                                {
                                  "numero":"A2",
                                  "disponivel":true
                                }
                                ]
                    },
                    {
                      "idFilme":  ObjectId("6539cf325d3eaf6f403515e6"),
                      "filme": "Os Vingadores: Era de Ultron",
                      "data":  ISODate("2016-05-01T10:00:00.000Z"),
                      "assentos":[{
                        "numero":"A1",
                        "disponivel":true
                                  },
                                  {
                                    "numero":"A2",
                                    "disponivel":true
                                  }
                                ]
                    }]
                        }]
          
                }] 
    
  }]

use('cinema-catalog-service');

// Create a new document in the collection.
db.getCollection('cinemaCatalog').insert(cinemaCatalog);
