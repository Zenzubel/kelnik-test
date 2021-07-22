/////////////////start map///////////////////////
//устанавливать перед инициализацией MagicScroll иначе не отобразится карта
  //start contacts map
  ymaps.ready(init);
  let myMap;
  function init () {
    var myMap = new ymaps.Map("map", {
    center:[55.02176818641737,82.95640157449007],
    zoom: 18,
    // Выключаем все управление картой
    controls: ['zoomControl']
    }); 
    let myGeoObjects = [];
    // Указываем координаты метки
    myGeoObjects = new ymaps.Placemark([55.02176818641737,82.95640157449007],{
      balloonContentHeader: 'ООО "Новая форма"',
      balloonContentBody: `
        - пошив спецодежды <br>
        - продажа спецодежды <br>
        - услуги ателье <br>
        ул. Бориса Богаткова, 101.
      `,
      balloonContentFooter: "+7-923-17-33-711",
    },{
      iconLayout: 'default#image',
      iconImageHref: 'images/favicon/favicon.png', 
      // Размеры иконки
      iconImageSize: [100, 100],
      // Смещение верхнего угла относительно основания иконки
      iconImageOffset: [-250, -50]
    });

    let clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: false,
      clusterOpenBalloonOnClick: false,
    });

    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);
    // Отключим zoom
    myMap.behaviors.disable('scrollZoom');
  }
  //end contacts map

//start map 2 map
ymaps.ready(init);

  function init () {
      var myMap = new ymaps.Map("map-1", {
          // Координаты центра карты
      center:[59.73115056441759,30.440383500000017],
          // Масштаб карты
      zoom: 17,
          // Выключаем все управление картой
      controls: []
      }); 

      var myGeoObjects = [];

      // Указываем координаты метки
      myGeoObjects = new ymaps.Placemark([59.73115056441759,30.440383500000017],{
        balloonContentBody: 'ул. Автомобильная, д.9',
                      },{
        iconLayout: 'default#image',
        iconImageHref: '../images/icons/logo-map.png', 
                      // Размеры иконки
        iconImageSize: [84, 95],
                      // Смещение верхнего угла относительно основания иконки
        iconImageOffset: [-35, -78]
      });

      var clusterer = new ymaps.Clusterer({
          clusterDisableClickZoom: false,
          clusterOpenBalloonOnClick: false,
      });

      clusterer.add(myGeoObjects);
      myMap.geoObjects.add(clusterer);
      // Отключим zoom
      myMap.behaviors.disable('scrollZoom');
////////////////////вторая карта/////////////////////
////////////////////вторая карта/////////////////////
////////////////////вторая карта/////////////////////
      var myMap = new ymaps.Map("map-2", {
          // Координаты центра карты
      center:[59.73115056441759,30.440383500000017],
          // Масштаб карты
      zoom: 17,
          // Выключаем все управление картой
      controls: []
      }); 

      var myGeoObjects = [];

      // Указываем координаты метки
      myGeoObjects = new ymaps.Placemark([59.73115056441759,30.440383500000017],{
        balloonContentBody: 'ул. Автомобильная, д.9',
                      },{
        iconLayout: 'default#image',
        iconImageHref: '../images/icons/logo-map.png', 
                      // Размеры иконки
        iconImageSize: [84, 95],
                      // Смещение верхнего угла относительно основания иконки
        iconImageOffset: [-35, -78]
      });

      var clusterer = new ymaps.Clusterer({
          clusterDisableClickZoom: false,
          clusterOpenBalloonOnClick: false,
      });

      clusterer.add(myGeoObjects);
      myMap.geoObjects.add(clusterer);
      // Отключим zoom
      myMap.behaviors.disable('scrollZoom');

  }
//end map