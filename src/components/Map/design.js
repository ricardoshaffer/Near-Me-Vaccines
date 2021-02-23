const GoogleMapDesign = ({ style }) => (
   (document.getElementById('map'), {
      mapTypeControl: false,
      scrollwheel: false,
      styles: [{
        elementType: 'geometry',
        stylers: [{
          color: '#ffffff'
        }]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#fff'
        }]
      },

      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#fff'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{
          color: '#e9f5ec'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#fff'
        }]
      },
      {
      featureType: 'poi.business',
            stylers: [{
                visibility: 'off'
            }]
      },
      {
      featureType: 'poi.government',
            stylers:[{
              visibility: 'off'
            }]
      },
        {
            featureType: 'poi.attraction',
                  stylers: [{
                      visibility: 'off'
                  }]
            },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          color: '#f2f2f2'
        }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#ffffff'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
          color: '#e9f1f5'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#f9f9f9'
        }]
      },
      {
        featureType: 'transit',
        stylers: [{
            visibility: 'off'
        }]
      },
      {
      featureType: 'poi.place_of_worship',
      stylers: [{
          visibility: 'off'
      }]
    },
    {
    featureType: 'poi.sports_complex',
    stylers: [{
        visibility: 'off'
    }]
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [{
        visibility: 'off'
    }]
  },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#d5cef1'
        }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#52a3a3'
        }]
      }
    ]
    })
    )
export default GoogleMapDesign;