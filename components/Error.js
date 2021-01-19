import React, { Component } from 'react'
import { Text, View } from 'react-native'

const Error = (props) => {

        return (
            <View>
                <Text> {props.error} </Text>
            </View>
        )

}

export default Error
