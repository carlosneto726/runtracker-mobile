import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { getUser, getUserLaps } from "../services";
import { useEffect, useState } from "react";
import style from "../style";
import { Lap } from "../interfaces";
import { Table } from "../components";

export function Profile () {
    const [user, setUser] = useState<any>();
    const [laps, setLaps] = useState<Array<any>>();

    useEffect(() => {
        (async () => {
            let user = await getUser();
            setUser(user);
            let laps = await getUserLaps();
            setLaps(laps);
        })();
    }, []);

    return (
        <SafeAreaView style={style.exampleContainer}>
            <ScrollView>
                {user && (
                    <Text style={{ fontSize: 16}}>
                        ID: {user.id} {'\n'}
                        NAME: {user.name} {'\n'}
                        EMAIL: {user.email} {'\n'}
                        EMAIL_VERIFIED_AT: {user.email_verified_at} {'\n'}
                        CREATED_AT: {user.created_at} {'\n'}
                        UPDATED_AT: {user.updated_at} {'\n'}
                    </Text>
                )}
                <View>
                    {laps && <Table list={laps}/>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
