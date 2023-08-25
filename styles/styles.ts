import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    regularFont: {
        fontFamily: 'Rubik-Regular'
      },

      textDefault: {
        fontFamily: 'Rubik-Medium',
      },

      title: {
        fontSize: 30,
        color: '#fBFEFB',
      },

      subtitle: {
        fontFamily: 'Rubik-Medium',
        fontSize: 23,
      },

      description: {
        fontSize: 12,
        color: '#FBFEFB',
      },

      smalltext: {
        fontSize: 9,
        color: '#B0B6B3',
      },
      
      label: {
        fontSize: 14,
        color: '#052B2D',
        marginBottom: 10
      },
      
      textbox: {
        width: 222,
        padding: 15,
        fontFamily: 'Rubik-Medium',
        backgroundColor: '#EDEDED',
        borderRadius: 3,
      },
    
      button: {
        alignItems: 'center',
        width: 222,
        paddingVertical: 10,
        paddingHorizontal: 45, /*FIXME:need to fix!!!*/
        borderRadius: 18,
        fontSize: 10,
    
      },

      next_button: {
        alignItems: 'center',
        width: 147,
        paddingVertical: 10,
        paddingHorizontal: 45, /*FIXME:need to fix!!!*/
        borderRadius: 12,
        fontSize: 13,
    
      },
    
      buttonText: {
        color: '#FBFEFB'
      },
    
      horizontalRule: {
        borderTopColor: '#052B2D',
        borderTopWidth: 1,
        paddingHorizontal: 100,
      },
    
      linkLogIn: {
        paddingVertical: 12,
        paddingHorizontal: 18,
      },
    
      linkLogInButton: {
        borderRadius: 3,
        borderColor: '#052B2D',
        borderWidth: 1,
      },
}) 

export default styles