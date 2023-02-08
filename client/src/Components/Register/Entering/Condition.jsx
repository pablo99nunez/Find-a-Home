import React from 'react';
import { TouchableOpacity, Text } from 'react-native';



export default function Condition({ ConditionName, HandleCheck, checkState }) {
    return (<>

        <TouchableOpacity onPress={() => HandleCheck(ConditionName)} className={checkState[ConditionName] ? "mt-3 mx-[4%] rounded-full bg-[#AB4E68] p-2" : 'mt-3 mx-[4%] rounded-full bg-[#77747470] p-2'}>
            <Text style={{ fontFamily: 'Roboto_300Light' }} className={checkState[ConditionName] ?
                "text-center text-[#FFF] font-extralight"
                : "text-center text-[#000000] font-extralight"}>
                {ConditionName}
            </Text>
        </TouchableOpacity>
    </>
    );
}
