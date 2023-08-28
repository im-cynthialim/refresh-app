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
- replace all SafeAreaViews with insets: https://reactnavigation.org/docs/handling-safe-area
- working search bar + new window (or modal) for search results
- settings popup
- convert all images in tab bar to icons: `https://medium.com/bam-tech/add-custom-icons-to-your-react-native-application-f039c244386c`
- fix header height, looks weird

Tutorial: 
- figure out flow for undefined user(in case Tutorial page beings without signup (can use if statement in signup area?))
    |_ **fixed** but page animation isn't correct

- Font size of wheel relative to rest of screen (test on other devices)
- Color! (Might need to change, + make sure all dark fonts are extreme dark color)
- Back button navigation a bit flawed when calling prev screen
- Button highlight for checkboxes on CS-3 screen

- Fix modal, want to click out of it
- How to save state for checkboxes when returning to previous page (redux?)
    


## Tasks:

- design search bar
<!-- - figure out store and data management -->
- implement **container-specific** data in expand container page
- welcome page before tutorial w explanation
- option to skip tut (flow will include empty container)

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

- replace Flatlist w Sectionlist?
- custom option for container temp?

- fix color + look for tut (too bland)
- "Select some factors you'd like to display" -> too vague, factors for what? need to specify for items in each container (but too long)


### figure out backend

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