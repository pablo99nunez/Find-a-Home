import React from 'react';
import { TouchableOpacity, Text } from 'react-native';


export default function Condition({ ConditionName, HandleCheck, checkState }) {
    return (
        <TouchableOpacity onPress={() => HandleCheck(ConditionName)} className={checkState[ConditionName] ? "mt-3 mx-[4%] rounded-full bg-[#AB4E68] p-2" : 'mt-3 mx-[4%] rounded-full bg-[#d9d9d971] p-2'}>
            <Text className={checkState[ConditionName] ?
                "text-center text-[#FFF] text-2xl font-extralight"
                : "text-center text-[#000000] text-2xl font-extralight"}>
                {ConditionName}
            </Text>
        </TouchableOpacity>
    );
}
