# To do list:

## Main Components:

Log In:
- changing type to interface where needed (e.g. textboxprops)
- add eye icon to pwd and add functionality (hide/show pwd on click) (secureTextEntry)
- add google and facebook logos
- forgot your pwd page

Sign Up:
- add eye icon to pwd and add functionality (hide/show pwd on click)
- fix spacing of elements (too spaced evenly)

Main:

### To Do

- pull down to refresh and update data
- replace all SafeAreaViews with insets: https://reactnavigation.org/docs/handling-safe-area
- working search bar + new window (or modal) for search results
- settings popup
- convert all images in tab bar to icons: `https://medium.com/bam-tech/add-custom-icons-to-your-react-native-application-f039c244386c`
- fix header height, looks weird

### Additional

### Notes

### Completed



Tutorial: 

### To Do

- fix progress bar (it's not even complete)
- showing food list when one is added (so need to add "Add food" button) + also learn about scrollview
- Back button navigation a bit flawed when calling prev screen
- figure out flow for undefined user(in case Tutorial page beings without signup (can use if statement in signup area?))
    |_ **fixed** but page animation isn't correct
- How to save state for checkboxes when returning to previous page (redux?)
- Decorate CS-4 page (with confetti or animation)
- Too much writing for add food section (product type explanation)

### Additional

- Item category pushing down components underneath when opened, want the dropdown to open on top of everything
- Font size of wheel relative to rest of screen (test on other devices)
- Color! (Might need to change, + make sure all dark fonts are extreme dark color)
- Button highlight for checkboxes on CS-3 screen
- Slice containerTemp string to not store temp values (in deg F, deg C) to db

### Notes


- Toast notification or page for added container?

modal library:
dropdown library: `https://www.npmjs.com/package/react-native-dropdown-select-list`

### Completed 

~~- Fix modal, want to click out of it~~
- P: losing containerName and all other data when adding new foods (Sep 1, 2023)
    - S: Use update instead of set for adding food to container bc set replaces all information (containerName, containerTemp, factorsList) we added previously with foodList. We don't want that so just "push" (with update) to container instead (and we're pushing an array so that renderItem can correctly pull content) 

- P: retrieving data from wrong location because of db link (Sep 1, 2023)
    -  S: userId was being added as an object (because it was received as an object parameter to ContainerSetup1 from Signup) to the link when setting container, but in all other locations it was a string
    - Solved with multiple console.log() lines to find where userId was being passed incorrectly 

Expand Container:

### To Do

- Add filter button + filter
- Remove line with opacity (like done with model display when option is blank) also need to configure display based on factors selected
- Fix tag images, should be based on product category

### Additional

### Notes

## Tasks:

- design search bar
<!-- - figure out store and data management -->
~~- implement **container-specific** data in expand container page~~
- welcome page before tutorial w explanation
- option to skip tut (flow will include empty container)
- history of where food has been stored (and for how long)

## Additional:
    
- gray layout for when objects loading (see ubereats page load for ref)
- collecting data based on location to accurately range room temp values
~~- fix isLoggedIn navigation path (e.g. if logged in, show home, else show log in)~~
- add sign-in option with email only by sending link to email to login
- add sign-in option with Google + Facebook as providers
- Change screen animation
- button highlights
- Splash screen and app icon
- Test greater screen sizes (responsive - work with percentages instead)
- Test border difference with newer phones



    - other languages!
    - Dark theme

Main Components:
    - sign in
    - log in
    - tutorial
    - new container
    - expand container
    
## Design decisions

- using this.setState vs setState?
- replace Flatlist w Sectionlist?
- custom option for container temp?

- fix color + look for tut (too bland)
- "Select some factors you'd like to display" -> too vague, factors for what? need to specify for items in each container (but too long)


### figure out backend

**- bc containerName is part of db link, need to ensure that container names never repeat**

- expand container design
- new container design
- tutorial page w container + foods setup

## Notes

- use fb uid for identifying users
- use fb token id for **VERIFYING** users

### Resources

- wheel picker: https://www.npmjs.com/package/react-native-wheely/v/0.2.1?activeTab=readme


To update ruby:
`echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.bash_profile`

`source ~/.bash_profile`

To run with expo:

`npx expo start`

<!-- no bundle URL present: 

`npm start` in refresh dir

on separate terminal run:
`npm run ios -- --simulator="iPhone SE (3rd generation)"` -->