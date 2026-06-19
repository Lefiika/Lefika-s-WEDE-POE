# CHANGELOG

All notable changes to this project will be documented in this file.

This project follows Semantic Versioning.

## Semantic Versioning

Format: MAJOR.MINOR.PATCH  
Example: 2.1.3

- MAJOR → Breaking changes (1.0.0 → 2.0.0) 
- MINOR → New features (1.0.0 → 1.1.0)  
- PATCH → Bug fixes / small improvements (1.0.0 → 1.0.1)

---

### Added

1.1.0
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/ef390abbaba6b3e6c57e9c265f13cfef2b58f314
Added business logo 

1.2.0
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/d29645b1e53b828c337264d9f77c9310996a7ed3
Added text to logo

1.3.0
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/55c10ae6748fe9436e02f7c39f638e66ba9cd95c
Added a Shopping page 

2.2.0
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/43f7fdac5f466005acb0425d7bb01fb5040523f0
Finshed the intierty of the shopping page 

2.3.0
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/96eafe20f7e14c7e897d4e8d2f85088dbe0d6ac4
finished the about page 

2.4.0
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/029e68bab25a93772a087f38235b941baf57cdff
created and finished the Contact Us page

2.5.0
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/93492e81a06a9e3982859b5a806c4e3432477001
Created and finsihed the checkout page 

2.6.0
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/4c489c4f8ee77abefc69b5104216d2c17c07e97b
Created and finshed the repair page 

2.8.0
Added figure and figcaption tags wrapping all product and service images across all pages on the site

2.8.1
Added span tags around all price values site wide for consistency

2.9.0
Added semantic time tags to all year and date references accross the entire site (2018,2020,2022,2026,2030)

2.10.0
Added abbr tags for all major technical terms across the site such as CPU, GPU, RAM, SSD, IT and DDR5

2.11.0
Added table element to the contact page for the opening hours and to the checkout page for the order summary

2.12.0
Added fieldset and legend tags to all three form sections on the repair booking page to group them properly

2.13.0
Added address tag to the contact page and the about page for the shop location and contact details

2.14.0
Added a new customer testimonials section to the home page using blockquote elements

2.15.0
Added a new Corsair DDR5 RAM product listing to the shop page with figure, figcaption and a mark tag for the best seller label

3.0.0
Added script.js, linked on contact, repair, shop and custom build pages, to handle Part 3 JavaScript functionality

3.1.0
Added a full contact form to contact.html (name, email, phone, message type, message) with HTML5 validation attributes and JS error handling

3.2.0
Wrapped the repair booking fields in a proper form tag and added name/required/validation attributes so the repair service, problem description, date and time are all validated before checkout

3.3.0
Added data-category attributes to the shop page product cards and made the Quick Filter buttons actually filter the list using JS

3.4.0
Added data-price and data-name attributes to the custom build radios so the component preview name and running total update live as parts are selected

3.5.0
Added robots.txt and sitemap.xml to the root of the project for basic SEO

3.6.0
Added meta description tags and improved title tags on every page for on-page SEO

3.7.0
Added search boxes to the custom build page so each component category (motherboard, CPU, RAM, GPU) can be searched, with an "unavailable" message shown when nothing matches

3.8.0
Added a real embedded Google Maps iframe to the contact page showing Pretoria Central, replacing the old static map image

3.9.0
Added working "Add to Cart" buttons on the shop page with an on-page "Added to cart!" confirmation message

3.10.0
Added a live price range readout on the shop page filter sidebar so the slider shows the selected amount

3.11.0
Added a working Pay button on the checkout page with an on-page payment confirmation message, replacing the link out to the bank website

3.12.0
Added a working search bar on the shop page that filters the product list by name

3.13.0
Changed the placeholder address (123 Innovation Street) on the contact and about pages to Pretoria Central to match the real map location

3.14.0
Added Cart (checkout.html) link to the navigation bar on all pages so the cart is always one click away from anywhere on the site

3.15.0
Added an empty-cart state to checkout.html that is shown when no items are in the cart, with three call-to-action buttons linking back to the Shop, Repair Booking, and Custom Build pages

3.16.0
Added remove-item buttons to every cart article on the checkout page so customers can remove individual items; the order summary table and grand total update live after each removal and the empty-cart state is shown automatically when all items are removed

3.17.0
Added 10 new product listings to the shop page covering RAM (G.Skill Trident Z5 RGB DDR5, Kingston FURY Beast DDR4), Motherboards (ASUS ROG Strix B650-E, MSI PRO B760M-A), Cases (Fractal Design Meshify C, NZXT H510 Flow), GPUs (AMD Radeon RX 7800 XT), CPUs (Intel Core i7-13700K), Keyboards (Logitech MX Keys Advanced), and Accessories (Samsung 970 EVO Plus SSD, Corsair RM850x PSU)

3.18.0
Added RAM, Motherboards, and Cases as new quick filter categories on the shop page and added data-category attributes to all new and existing product cards so every filter button correctly shows only matching products

---

### Changed

1.0.0
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/79b5a576e1f1f4711e944fa24ba64055224513d0
completly reworked the home page 

2.0.0
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/55c10ae6748fe9436e02f7c39f638e66ba9cd95c
Redid the home page again to add more content into it since it was to empty while also reworking the headers and footer of the website

2.1.0
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/f1b121e481221a931a63621dc492a2f19a829cb7
Replaced the place holder iags with real ad relevant image links 

2.7.0
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/abe3c7f81747db1ddf71dd6c071d27db000e3d43
Changed the design for repair services to make it make better sense by replacing the article with a list in the form of radio groups 
also added more choices to the list

2.16.0
Added srcset and sizes attributes to product and service images across 
the site to support responsive image loading at different screen sizes.
Images now serve appropriately sized content at mobile (480px), 
tablet (768px), and desktop breakpoints using vw-based size hints.

3.13.0
Changed the placeholder address (123 Innovation Street) on the contact and about pages to Pretoria Central to match the real map location

---

### Fixed

2.5.1
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/93492e81a06a9e3982859b5a806c4e3432477001
Fixed all the webpags footers 

2.5.2
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/471394ae37658f1606764a2ec5fdea213ca5f0e9
fixed about us page footer

2.6.1
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/4c489c4f8ee77abefc69b5104216d2c17c07e97b
Fixed the headers of the checkout page and home page

2.6.2
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/8902a8ef9411da237c69b0ee27d128aac46277e7
Fixed link issue on the headers 

2.6.3
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/2c25732b6cbeb3fa426dec84a0e65e46d49c09d1
Final work on code cleaning and optimizing it while fixing errors when found

2.6.4
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/95e577dfe02cb2e3b49f0fb65bf4d7eb288809ee
Reworked the header to fix logical errors such as having the checkout page assesable throught the navigation bar 
fixed the issue of the header not being consistent on different pages 
also finished listing the references used during coding

2.6.5
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/594087e17e28da9758c1f0d631aae8410209eda4
Further fixing of header navigation

2.7.1
https://github.com/Lefiika/Lefika-s-WEDE-POE/commit/a6611b4b37d5a982c5b213bb651d6ddd16167e42
Patched issue of services being blank

2.15.1
Fixed duplicate closing main tag and stray closing form tag in repair page 
fixed typo in the checkout page textarea id from instractions to instructions

3.0.1
Added missing id and name attributes to the repair page problem textarea so it could be properly validated




