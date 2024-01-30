# React WeatherApp

## Описание проекта
Приложение о погоде по городам по всему миру с использованием openweathermap API и их геокодера.

### Версия Node
При создании использована версия Node v20.10.0. Для переключения между версиями Node в терминале можете использовать команду:

`nvm use v20.10.0`

### Установка проекта
Для развертывания проекта локально выполните следующие шаги:

`git clone https://github.com/RPen05/WeatherApp.git`

`npm install`

### Запуск сервера
Для запуска сервера используйте команду:

`npm start`

# Текст тестового задания
## React.JS | Test
Must init app with Create-React-App using TypeScript

Must using OpenWeatherMap API

If you need Google Maps API for geolocation you can use provided API key:
AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs


## Acceptance criteria:
1.Displaying the current weather of the user by his location by default if the user granted location access.

2.Adding a city to the list by autocompleting search and save it to application settings.

3.Switching from Celsius to Fahrenheit by clicking on the corresponding sign, for each card separately. Should be saved as application settings.

4.Language switching globally for all displayed cities. Available languages are English, Ukrainian, and Russian. Should be saved as application settings. (for translation use this library https://react.i18next.com)

5.Displaying an icon from the OpenWeatherMap service

6.Using this request https://api.openweathermap.org/data/2.5/forecast?q= {city_name }&appid={API_KEY} create a graph of temperature and date dependencies (using any library for plotting)

7.The layout of the application must be made according to the design provided

The application should store settings in LocalStorage.
For state management, you should use Redux or MobX.


## Комментарии после выполнения тестового задания
1.Поисковая строка иногда подлагивает. Если после ввода запроса не появляется поисковая выдача, попробуйте убрать фокус с поисковой строки и снова вернуть его.

2.Определение текущей геопозиции пользователя возможно не через все браузеры, так как локальный проект имеет протокол HTTP, и в некоторых случаях браузерное API просто не отработает. Функция по определению геопозиции реализована в хуке useDefaultWeatherData. Если не дано разрешение на определение геопозиции или произошла ошибка, то отображается дефолтный город - Симферополь.

3. Функции по удалению из LocalStorage работают не корректно

3.Желательно использовать стабильное интернет-подключение, так как Axios может не хватить времени, чтобы получить и обработать данные от API.

4.Если интернет не стабилен и данные не загружаются, попробуйте в места, где делает запрос, добавить задержку:

`const response = await axios.get('link', { timeout: #### });`

  
