angular.module('starter.controllers', [])

.controller('TabsCtrl', function($scope) {
 //  $ionicConfigProvider.tabs.position('bottom');
})

.controller('RecientesCtrl', function($scope) {
 
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

.controller('MapCtrl', function($scope, $stateParams, $cordovaGeolocation, $ionicPopup, $cordovaCamera) {
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
                  
                }  
              },
              {
                text: 'Camara',
                type: 'button-positive',
                onTap: function(e) {
                 
                 $scope.imagen = "";
                    var optionsCamera = {
                      quality: 50,
                      destinationType: Camera.DestinationType.DATA_URL,
                      sourceType: Camera.PictureSourceType.CAMERA,
                      allowEdit: true,
                      encodingType: Camera.EncodingType.JPEG,
                      targetWidth: 100,
                      targetHeight: 100,
                      popoverOptions: CameraPopoverOptions,
                      saveToPhotoAlbum: false,
                      correctOrientation:true
                    };
                    
                  $cordovaCamera.getPicture(optionsCamera).then(function(imageData) {
                     $scope.imagen  = "data:image/jpeg;base64," + imageData;
                    }, function(err) {
                      // error
                    });
                }
              }
            ]
          });
    }
    
    
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

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: -33.890, lng: 151.274}, // Brooklyn.
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    }
  });


    google.maps.event.addListenerOnce(map, 'idle', function(){
     var images = 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpl1/v/t1.0-1/p50x50/21514_812735088838186_515750925131669150_n.jpg?oh=42a9f30b990a54ca519295e4c0d01577&oe=57A9F67B&__gda__=1467887527_ba315821efa95ce5ddbc5e08e73f8cbc';
    var tittle = "holis";
      var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: {lat: -33.890, lng: 151.274},

          icon: $scope.imagen 
      });      
    });
      
        map.addListener('click', function() {
        chooseOption();
        var beachMarker = new google.maps.Marker({
            position: {lat: -33.890, lng: 151.274},

            map: map,
            icon: $scope.imagen 
          });
     
  });

      map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);
 
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

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(5);
  $ionicConfigProvider.tabs.position('bottom');
});
