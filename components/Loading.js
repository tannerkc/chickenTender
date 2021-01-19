import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

const Loading = () => {

        return (
            <View style={styles.container}>
                <Image source={{uri: "https://cdn.dribbble.com/users/2049851/screenshots/4368846/design_burger_800x600.gif"}} style={{width: 300, height: 300}}/>
            </View>
        )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
      },
})

export default Loading
