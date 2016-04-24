 var customMapType = new google.maps.StyledMapType(
      [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    }
], {
      name: 'Custom Style'
  });
  var customMapTypeId = 'custom_style';

angular.module('starter.controllers', [])

.controller('TabsCtrl', function($scope) {
 //  $ionicConfigProvider.tabs.position('bottom');
})

.controller('RecientesCtrl', function($scope, $state, Alerts) {
    $scope.recientes = [];
    $scope.addinmap = function(){
        $state.go('tab.add');    
    }
    
    
    function iconos(id){
        switch(id){
            case 2:
                return 'ion-ios-paw';
            break;
            case 1:
                return 'ion-waterdrop';
            break;
            case 3:
                return 'fa fa-tree';
            break;    
        }
    }
    
    
    Alerts.all().then(function(response){
        console.log(response.data);
        for(var i=0;i<response.data.length;i++){
            $scope.recientes.push({
                id: response.data[i]._id,
                name: response.data[i].title_alert,
                lastText: response.data[i].description_alert,
                fecha: response.data[i].date_alert,
                categoria: response.data[i].category,
                icono: iconos(response.data[i].category)
            });    
        }
    })
    
})

.controller('MapCtrl', function($scope, $stateParams, $cordovaGeolocation, $ionicPopup, $cordovaCamera, $stateParams, Alerts) {
    var options = {timeout: 10000, enableHighAccuracy: true};
    $scope.imagen = '';
    $scope.color  = '';
    
    function color(id){
        switch(id){
            case 2:
                return '#FFA61B';
            break;
            case 1:
                return '#168AFC';
            break;
            case 3:
                return '#2DCC70';
            break;    
        }
    }
    
    function iconos(id){
        switch(id){
            case 2:
                return 'img/caza-marker.png';
            break;
            case 1:
                return 'img/agua-marker.png';
            break;
            case 3:
                return 'img/deforestacion-marker.png';
            break;    
        }
    }
    
    Alerts.get($stateParams.mapId).then(function(response){
          $scope.imagen = iconos(response.data.category);
          $scope.color  =  color(response.data.category);
             var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center:  {lat: response.data.latitude_alert, lng: response.data.longitude_alert},
                mapTypeControlOptions: {
                  mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
                }
              });

            map.mapTypes.set(customMapTypeId, customMapType);
            map.setMapTypeId(customMapTypeId);

        google.maps.event.addListenerOnce(map, 'idle', function(){
          var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: {lat: response.data.latitude_alert, lng: response.data.longitude_alert},
              icon: $scope.imagen 
          });


             var circle = new google.maps.Circle({
             map: map,
             radius: 100,    // 10 miles in metres
             fillColor:   $scope.color,// '#FF741B',
             strokeColor: $scope.color,//strokeColor : '#AA00FF',
             strokeWidth: 5
            });


            circle.bindTo('center', marker, 'position');  
            var infoWindow = new google.maps.InfoWindow({
                 content: "Here I am!"
             });

            var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: {lat: response.data.latitude_alert, lng: response.data.longitude_alert},

              icon: $scope.imagen 
          });
         
    });
    
      
     
  });

     
 
})

.controller('CategoriasCtrl', function($scope) {
      function iconos(id){
        switch(id){
            case 1:
                return 'ion-ios-paw';
            break;
            case 2:
                return 'ion-waterdrop';
            break;
            case 3:
                return 'ion-ios-flame-outline';
            break;    
        }
    }
    
    $scope.recientes = [{
        id: 0,
        name: 'Rio en contaminacion',
        lastText: 'Guatemala, guatemala',
        fecha: '23/04/2016',
        categoria: 1,
        icono: iconos(2)
    },{
        id: 1,
        name: 'Caza ilegal de animales',
        lastText: 'Guatemala, guatemala',
        fecha: '23/04/2016',
        categoria: 2,
        icono: iconos(1)
    }];
    
})

.controller('AddCtrl', function($scope, $stateParams, $cordovaGeolocation, $ionicPopup, $cordovaCamera, $cordovaImagePicker, $ionicModal, $state, Alerts) {
    
     function Mensaje(titulo, cuerpo){
        var myPopup = $ionicPopup.show({
            title:    titulo,
            subTitle: cuerpo,
            buttons: [
              { text: 'Aceptar',
               type: 'button-positive',
                onTap: function(e) {
                  
                }  
              }]
        });
    };
    
      $scope.alert = {};
      $ionicModal.fromTemplateUrl('templates/modal-add.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      
      // Perform the login action when the user submits the login form
      $scope.doLogin = function() {
        console.log('Doing login', $scope.alert.category);
        Alerts.new($scope.alert).then(function(response){
            $scope.modal.hide();
            Mensaje("Registro exitoso",response.data.message);
            $state.go('tab.recientes');
        });
        
          
      };
    
    
    
    
     Mensaje("Seleccionar ubicacion", "Seleccione la ubicacion del inciente");
    
     var options = {timeout: 10000, enableHighAccuracy: true};
  
    $scope.imagen = 'img/agua-marker.png';
    
    function chooseOption(){
        var myPopup = $ionicPopup.show({
            title: 'Seleccione una opcion',
            subTitle: 'Agregar foto por:',
            scope: $scope,
             buttons: [
              { text: 'Galeria',
                type: 'button-positive',
                onTap: function(e) {
                  var options = {
                   maximumImagesCount: 1,
                   quality: 40
                  };
                    
                  $cordovaImagePicker.getPictures(options)
                    .then(function (results) {
                      for (var i = 0; i < results.length; i++) {
                       window.plugins.Base64.encodeFile(results[i], function(base64){
                           $scope.alert.image_path_alert = base64;
                       });
                      }
                          $scope.modal.show();
    
                    }, function(error) {
                      // error getting photos
                    });
                }  
              },
              {
                text: 'Camara',
                type: 'button-positive',
                onTap: function(e) {
                 
                 $scope.imagen = "";
                    var optionsCamera = {
                      quality: 40,
                      destinationType: Camera.DestinationType.DATA_URL,
                      sourceType: Camera.PictureSourceType.CAMERA,
                      allowEdit: true,
                      encodingType: Camera.EncodingType.JPEG,
                      popoverOptions: CameraPopoverOptions,
                      saveToPhotoAlbum: false,
                      correctOrientation:true
                    };
                    
                  $cordovaCamera.getPicture(optionsCamera).then(function(imageData) {
                    $scope.alert.image_path_alert = "data:image/jpeg;base64," + imageData;
                          $scope.modal.show();
    
                    }, function(err) {
                      // error
                    });
                }
              }]
          });
    }
    

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 14.6564, lng: -90.5110}, // Brooklyn.
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    }
  });

    
    google.maps.event.addListener(map, 'click', function(event) {
         chooseOption();
        var myLatLng = event.latLng;
        var lat = myLatLng.lat();
        var lng = myLatLng.lng();
        $scope.alert.longitude_alert = lng;
        $scope.alert.latitude_alert  = lat;
        
        var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: {lat: lat, lng: lng},

          icon: $scope.imagen 
         });
        
        
         var circle = new google.maps.Circle({
         map: map,
         radius: 100,    // 10 miles in metres
         fillColor: '#435EFF',// '#FF741B',
         strokeColor: '#435EFF',//strokeColor : '#AA00FF',
         strokeWidth: 5
        });
        
        
        circle.bindTo('center', marker, 'position');  
        var infoWindow = new google.maps.InfoWindow({
             content: "Here I am!"
         });
    })

      map.mapTypes.set(customMapTypeId, customMapType);
      map.setMapTypeId(customMapTypeId);
 
})


.controller('CatMapCtrl', function($scope, $stateParams, $cordovaGeolocation, $ionicPopup, $cordovaCamera, $ionicModal, $stateParams, $filter, Alerts) {
    
      $ionicModal.fromTemplateUrl('templates/modal-info.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      
      // Perform the login action when the user submits the login form
      $scope.doLogin = function() {
        console.log('Doing login', $scope.alert.category);
        Alerts.new($scope.alert).then(function(response){
            $scope.modal.hide();
            Mensaje("Registro exitoso",response.data.message);
            $state.go('tab.recientes');
        });
        
          
      };
    
    var options = {timeout: 10000, enableHighAccuracy: true};
    $scope.imagen = '';
    $scope.color  = '';
    $scope.data   = {};
    function color(id){
        switch(id){
            case 2:
                return '#FFA61B';
            break;
            case 1:
                return '#168AFC';
            break;
            case 3:
                return '#2DCC70';
            break;    
        }
    }
    
    function iconos(id){
        switch(id){
            case 2:
                return 'img/caza-marker.png';
            break;
            case 1:
                return 'img/agua-marker.png';
            break;
            case 3:
                return 'img/deforestacion-marker.png';
            break;    
        }
    }
    $scope.alerts = [];
    $scope.getAlerts = function(){
   Alerts.all().then(function(response){
       $scope.alerts = response.data;
       if($stateParams.cat != 4)
       $scope.alerts = $filter('filter')($scope.alerts, {category: $stateParams.cat});
    
       var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 16,
                    center:  {lat: $scope.alerts[0].latitude_alert, lng: $scope.alerts[0].longitude_alert},
                    mapTypeControlOptions: {
                      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
                    }
                  });

                map.mapTypes.set(customMapTypeId, customMapType);
                map.setMapTypeId(customMapTypeId);
       var markers = [];
       for(var j = 0;j< $scope.alerts.length;j++){
        
           $scope.imagen = iconos($scope.alerts[j].category);
           $scope.color  =  color($scope.alerts[j].category);
              
            markers[j] = new google.maps.Marker({
                  map: map,
                  animation: google.maps.Animation.DROP,
                  position: {lat: $scope.alerts[j].latitude_alert, lng: $scope.alerts[j].longitude_alert},
                  icon: $scope.imagen ,
                  id:   $scope.alerts[j]._id,
                  html: $scope.alerts[j]._id
              });
           
            
            google.maps.event.addListener(markers[j], 'click', function(){
               $scope.modal.show();
                Alerts.get(this.id).then(function(response){
                    $scope.data.title = response.data.title_alert;
                    $scope.data.body  = response.data.description_alert;    
                });
               
            });
                 var circle = new google.maps.Circle({
                     map: map,
                     radius: 100,    // 10 miles in metres
                     fillColor:   $scope.color,// '#FF741B',
                     strokeColor: $scope.color,//strokeColor : '#AA00FF',
                     strokeWidth: 5
                });
           
                circle.bindTo('center', markers[j], 'position');  
         
       }
       
   });
  }
    $scope.getAlerts();
 
})


.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(5);
  $ionicConfigProvider.tabs.position('bottom');
});
