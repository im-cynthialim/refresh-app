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

## Additional:
    
    - fix isLoggedIn navigation path (e.g. if logged in, show home, else show log in)
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
    



## Tasks:
- design search bar
- figure out store and data management
- implement **container-specific** data in expand container page

### figure out backend

- expand container design
- new container design
- tutorial page w container + foods setup

## Notes

- use fb uid for identifying users
- use fb token id for **VERIFYING** users


To update ruby:
`echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.bash_profile`

`source ~/.bash_profile`

To run with expo:

`npx expo start`

<!-- no bundle URL present: 

`npm start` in refresh dir

on separate terminal run:
`npm run ios -- --simulator="iPhone SE (3rd generation)"` -->