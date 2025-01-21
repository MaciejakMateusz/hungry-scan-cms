# HungryScan - CMS microservice

Web application for restaurant owners, allowing them to easily create and manage digital menu. 
Big highlight of this system is generating QR codes for restaurants that connects customers with digital menu, 
that is currently active (it is possible to create different menus for different hour/day ranges).
It connects to REST-API:
https://github.com/MaciejakMateusz/hungry-scan-core

## Technologies Used
- **React** - JS library
- **Redux** - enables global app state
- **Thunk** - for handling async communication with servers and additional UI/logic separation

## Functionalities:
- Main page
- Registration (with mail account activation)
- Login (2FA, password recovery)
- Dashboard defined by organisation/user (user can add more restaurants and users to collaborate with him, also allow/disallow restaurant menu modifications if needed)
- Displaying amount of scans for each restaurant user has
- Displaying what package is currently active (per restaurant)
- Displaying most popular dishes
- Panel to administrate users
- Switching active restaurant
- Switching from current restaurant dashboard to its CMS
- CMS defined by active restaurant
- Switching currently edited menu
- Crafting menu from scratch (adding categories, dishes, additions, regenerating QR-code, translations)
- Translations are connected with AI model through REST-API server, user can choose to automatically translate every "translatable" objects (it is scalable to add any language in the future)
- Dish forms are refined with customer mobile app preview (what it will look like on the phone)

## Project design
The design of the application was developed in collaboration with a UX/UI designer. 
The project is based on her designs created in Figma. A set of SVG icons and images was provided for the project.


## License

This project is licensed under the Read-Only License - Version 1.0.

### Read-Only License - Version 1.0

1. You are allowed to view and inspect the source code of this project for educational
   and non-commercial purposes.
2. You are not permitted to modify, distribute, sublicense, or use the source code or
   any part of it for any commercial purposes without explicit written permission from
   the project's author.
3. The project's author (Mateusz Maciejak) reserves all rights not expressly granted
   under this license.
4. This project is provided "as-is" and without any warranty. The project's author
   shall not be liable for any damages or liabilities arising from the use of the project.
5. The project's author retains all copyright and intellectual property rights to
   the source code.

For any questions or inquiries regarding commercial use, please contact the project's
author at maciejak.praca@gmail.com.

### Author

*Mateusz Maciejak*
