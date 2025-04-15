import { ScrollView, View, Text, StyleSheet } from "react-native";

interface Props {
    list: Array<any>;
}

export default function Table({ list }: Props) {

    const style = StyleSheet.create({
        headerCell: {
            flex: 1,
            alignSelf: 'stretch',
            fontSize: 10,
            fontWeight: 'bold',
            borderEndWidth: 1,
            borderBottomWidth: 1,
            borderTopWidth: 1
        },
        cell: {
            flex: 1,
            alignSelf: 'stretch',
        },
        row: {
            flex: 1,
            alignSelf: 'stretch',
            flexDirection: 'row',
        },
        invalidRow: {
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
        }
    });

    function renderRow(row: any, index: number) {
        return (
            <View key={index} style={[style.row, row.isValid? '': style.invalidRow]}>
                {/* <Text style={style.cell}>{row.created_at}</Text> */}
                <Text style={style.cell}>{row.time}</Text>
                <Text style={style.cell}>{row.avg_speed / row.coords_count}</Text>
                <Text style={style.cell}>{row.top_speed}</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={style.row}>
                {/* <Text style={style.headerCell}>Data</Text> */}
                <Text style={style.headerCell}>Tempo (m:s:ms)</Text>
                <Text style={style.headerCell}>Avg Vel (m/s)</Text>
                <Text style={style.headerCell}>Max Vel (m/s)</Text>
            </View>
            {list.map(renderRow)}
        </ScrollView>
    );
}
