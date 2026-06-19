# Project Title
Tech Lover's Website Creation 

## Student Information
**Student number:** ST10534811
**Student Name:** Lefika Kolojane

## Project Overview

Name:  Tech Lover’s

Tech Lover’s History:
Tech Lover’s was founded in 2018 by Lefika Polokwane and John Mbusi, who began as a dedicated two man repair team working out of a small garage. Their reputation for quality work grew so quickly that by 2020, they answered the community's call to expand, moving into a dedicated retail space and adding computer parts to their service list. The business reached a new milestone in 2022 when they began offering both prebuilt and custom designed computers. Now in 2026, Tech Lover’s is taking its next big step by launching an online platform, bringing their expert products and repair services directly to customers through regional delivery.

Tech Lover’s Mission:
To provide reliable, high quality tech solutions from expert repairs to custom builds while maintaining the personal, community focused service that started in our garage. We aim to keep your world connected by making technology accessible, repairable and built to last . 

Tech Lover’s Vision :
To evolve from a local repair hub into a premier nationwide tech provider by 2030, setting the standard for sustainable technology. We aim to integrate a seamless online shopping experience with our deep technical expertise, ensuring that high quality computer parts, custom builds, and professional IT support are accessible to every home and small business across the country.

Target Audience:
•	Students & Casual Users: Individuals looking for affordable laptops, quick repairs (like cracked screens), and honest advice for everyday tech issues.
•	Gamers & Enthusiasts: High end users seeking specific computer parts, powerful GPUs, and bespoke custom built gaming rigs.
•	Small Businesses: Local companies needing bulk hardware, office network setups, and "on call" technical support for their operations.
•	Small Businesses: Local companies needing bulk hardware, office network setups, and "on call" technical support for their operations.
•	Remote Shoppers (New for 2026): Customers nationwide who want the expertise of a specialized tech shop delivered to their door via the new online store.


## Website Goals and Objectives

Goals for the website:
•	Digital Brand: Move the shop from a local garage to a professional online store.
•	Easy Repairs: Simple online booking for computer fixes.
•	Sales Growth: Sell parts and custom PCs with a smooth checkout and delivery.
•	Business Leads: Attract small companies needing professional IT services.
Website performance KPIs
•	Traffic Volume: Number of monthly visitors to the site.
•	Conversion Rate: Percentage of visitors who buy a product or book a repair.
•	Bounce Rate: Percentage of users who leave the site after viewing only one page.
•	Average Session Duration: How long users spend exploring products or services.
•	Load Speed: The time it takes for the website to open and function smoothly.
•	Mobile Responsiveness: Percentage of successful interactions from smartphone users.
(Ideas from : HubSpot: Essential Website KPIs to Track)
Proposed Website Features and functionality:
•	Home Page: The main entrance to the site. It’s the starting hub of the whole website and allows you to go to all points of the website.
•	About Us Page: A section that tells the story of the business. It introduces the owners, Lefika and John, explains their experience with technology, and shares the shop's mission to provide honest and fast repairs.
•	Shop Page: Where customers buy parts and computers. It has a search bar, categories (like Keyboards or CPUs), and clear pictures and prices for every item.
•	Contact Page: Shows the shop’s address on a map, their opening hours, and a way to message them directly on WhatsApp And Email. Also has their socials .
•	Repair Booking Page: A form where customers can pick their device (like a laptop), select what is wrong with it, and choose a date and time to bring it in.
•	Custom Build Page : a page where the customer gets to Create their own custom build PC
•	Order Finalizing Page: A page where you will view your cart and finalize your purchase and requests . 
 
Features and services inspired from rival company website  , httpls://www.wootware.co.za 
Further understanding of basic retail web store requirements received from 
https://www.sitebuilderreport.com/inspiration/retail-websites

## Timeline and Milestones

I will Spend 5 Days on completing the HTML side of the code from 2026/04/13 to 2026/04/17
I will spend 2 days from 2026/04/17  to 2026/04/19 fault checking the code to prevent errors or bugs 
I will spend the following weeks using JavaScript and CSS to finalise the website.

## Part 3: JavaScript, Forms and SEO

Everything JavaScript related lives in one file: **script.js**. It's linked at the bottom of the contact, repair, shop, custom build, and checkout pages. Here's a plain walkthrough of everything it does, section by section.

 

### Cart Storage (runs on every page)

Before anything else, the script sets up a cart that actually survives page navigation. The problem with storing the cart in a plain JavaScript variable is that the moment you click to a new page, the browser wipes it and you start fresh. To fix that, the cart is saved to **localStorage** — a small storage space that browsers keep around between page loads.

Two small helper functions handle this. One reads the cart out of localStorage when the page loads, and the other writes it back every time something changes. Every other part of the script uses these two functions to stay in sync, so the cart is always up to date no matter which page you're on.

 

### 1. Contact Form Validation (contact.html)

When someone fills in the contact form and hits Send, the script steps in before anything gets submitted and checks each field one by one.

  **Full Name** — it checks that the field isn't empty and that the name is at least 2 characters long.
  **Email** — it runs the address through a pattern check to make sure it looks like a real email (something@something.something).
  **Phone** — this one is optional, so it only checks the format if the person actually typed something in.
  **Message Type** — it makes sure the person chose an option from the dropdown, not just left it on the placeholder.
  **Message** — it checks the message exists and is at least 10 characters, so people can't just send a blank note.

If any of those checks fail, the script collects all the problems into a list, shows them to the user in red text, and stops the form from submitting. Once everything passes, a green confirmation message appears and the form resets.

 

### 2. Repair Booking Form Validation (repair.html)

The repair form works the same way — the script intercepts the submit button and checks a few things before letting it through.

It also does something extra here: as soon as the page loads, it looks up today's date and sets it as the earliest allowed date on the date picker. That way nobody can accidentally book a repair for a date that's already passed.

On submit it checks:
  That the customer actually picked one of the repair service options (Screen Repair, Battery Replacement, etc.).
  That the problem description is filled in and at least 10 characters long, so there's something useful to go on.
  That a date has been chosen and it isn't in the past.
  That a preferred time has been picked as well.

If anything is missing, it shows the errors in red and keeps the customer on the page so they can fix them.

 

### 3. Shop Quick Filters and Search Bar (shop.html)

Every product card on the shop page has a hidden label on it called a `data category` — things like "Keyboards", "GPUs", "RAM", and so on. The quick filter buttons at the top of the page use those labels to show and hide cards.

When you click a filter button, the script goes through every product card and checks whether its category matches the button you clicked. If it matches, the card stays visible. If it doesn't, the card gets hidden. Clicking "All Items" just makes everything visible again. The active button also gets a highlight so it's clear which filter is currently on.

The search bar works a bit differently — instead of checking the category label, it checks whether the product card's text content contains whatever you typed. So if you search "Corsair", any card that mentions Corsair anywhere will show up, regardless of category. If nothing matches either a filter or a search, a "no results" message appears.

There's also a price range slider in the sidebar. As you drag it, the script reads the current value and displays it as a formatted Rand amount next to the slider, so you can see exactly where you've set the limit.

 

### 4. Add to Cart Buttons (shop.html)

Every product card has an Add to Cart button with two pieces of information attached to it: the item's name and its price. When you click the button, the script reads those two values, loads the current cart from localStorage, adds the new item, and saves it back. It also shows a small "Added to cart!" confirmation message next to the button for 3 seconds, then clears it.

Because the cart is saved to localStorage immediately, if you open the checkout page afterwards, your items will be there.

 

### 5. Custom Build Live Preview (custom.html)

The custom build page has four component categories — Motherboard, CPU, RAM, and GPU — each with a set of radio buttons. When you pick a part, two things happen at once.

First, the preview image on the right side of the page updates to show the part you just selected. Each radio button has an image URL stored in a `data img` attribute, so the script just grabs that URL and swaps it into the preview image's `src`.

Second, the script goes through all four categories and adds up the prices of every part that's currently selected. The running total at the bottom updates live so you can see the full build cost grow as you make choices. The name field below the image also updates to list every selected part by name.

There's also a search box above each category list. As you type, the script hides any parts that don't match what you're searching for. If nothing in a category matches, the list hides itself and a small "This component is unavailable" message appears in its place.

When you're happy with your build, clicking "Add Build to Cart" pushes every selected part into the localStorage cart as individual items — the same cart the checkout page reads from.

 

### 6. Checkout Page (checkout.html)

When the checkout page loads, the script immediately reads the cart from localStorage. It wipes any hardcoded placeholder items that might be in the HTML and replaces them with whatever is actually in the cart. Each item gets rendered as a card showing the name, price, and a Remove button.

After rendering the items, the script builds the order summary table on the right side — it loops through every item, adds a row for each one, and calculates the grand total at the bottom.

The Remove buttons each have a click listener attached. When you remove an item, the script deletes that card from the page, updates localStorage to reflect the removal, and then rebuilds the order summary table and grand total so everything stays accurate. If you remove the last item, the cart items section disappears and an empty cart message takes its place, with three buttons linking back to the Shop, Repair Booking, and Custom Build pages.

The Pay button checks that there's actually something in the cart before doing anything. If the cart is empty it shows an error. If there are items, it shows a green payment confirmation message and then clears the cart from localStorage so it starts fresh for the next visit.

 

### SEO Additions

Along with the JavaScript, a few things were added to improve how the site shows up in search engines:

  A **robots.txt** file was added to the project root. This tells search engine crawlers that they're welcome to index the whole site, and points them to the sitemap.
  A **sitemap.xml** was added listing all the pages on the site, which helps search engines discover and index them faster.
  Every page now has a **meta description** tag — a short sentence that describes what the page is about. Search engines use this as the snippet of text shown under the page title in results.
  Every page title was made more specific (for example "Book a PC or Laptop Repair | Tech Lover's" instead of just "Repair"), which helps both search rankings and browser tab readability.

## Sitemap

<img width="3164" height="1844" alt="image" src="https://github.com/user attachments/assets/b853a5ca 86a9 4c4c 97a7 3bf9b49f036a" />

## References

HubSpot, 2026. Essential Website KPIs to Track. [online] Available at: https://www.hubspot.com [Accessed 11 April 2026].

Sitebuilderreport, 2026. Retail Website Design Inspiration. [online] Available at: https://www.sitebuilderreport.com [Accessed 11 April 2026].

Wootware, 2026. Custom PC Component Selection and Layout. [online] Available at: https://www.wootware.co.za [Accessed 12 April 2026].

Google Gemini, 2026. AI assistant consultation for code debugging and logic resolution. [Software] Available at: https://gemini.google.com (Accessed: 20 April 2026).

Kevin Powell, 2024. HTML & CSS Crash Course: Build a website from scratch. [YouTube] Available at: https://www.youtube.com/@KevinPowell (Accessed: 20 April 2026).

Traversy Media, 2024. HTML5 and CSS3 fundamentals for responsive design. [YouTube] Available at: https://www.youtube.com/@TraversyMedia (Accessed: 20 April 2026).
.
W3Schools, 2026. HTML(5) Tutorial: The language for building web pages. [online] Available at: https://www.w3schools.com/html/ (Accessed: 20 April 2026).

Masterminds Tutorials ,2021.Watched the video to learn how do add a date time picker. Available at: https://www.youtube.com/watch?v=3vD1kTzQsNE&t=70s (Accessed: 20 April 2026).

MDN Web Docs, 2026. Client side form validation. [online] Available at: https://developer.mozilla.org/en US/docs/Learn/Forms/Form_validation (Accessed: 16 June 2026).

W3Schools, 2026. JavaScript HTML DOM. [online] Available at: https://www.w3schools.com/js/js_htmldom.asp (Accessed: 16 June 2026).

Google Search Central, 2026. Introduction to robots.txt. [online] Available at: https://developers.google.com/search/docs/crawling indexing/robots/intro (Accessed: 17 June 2026).

