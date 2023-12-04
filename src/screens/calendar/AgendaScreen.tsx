import React, { useEffect, useState } from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { ChurchCalendar } from "./interface";
import { api } from "../../utils/axios";
import { Agenda } from "react-native-calendars";

const db = SQLite.openDatabase("church.db");

export const AgendaScreen = () => {
  const [churches, setChurches] = useState<ChurchCalendar[]>([]);
  const [res, setRes] = useState()

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const startDateString = `${currentYear}-${currentMonth}-01T00:00:00Z`
  const startDateStringCal = `${currentYear}-${currentMonth}-02T00:00:00Z`
  const dateToMessWith = new Date(startDateString)
  dateToMessWith.setMonth(dateToMessWith.getMonth() + 2, 1)
  dateToMessWith.setDate(dateToMessWith.getDate() - 2)
  const endDate = dateToMessWith.toISOString()
  const endDateFormatted = endDate.slice(0, endDate.indexOf('T'))
  const endDateString = `${endDateFormatted}T00:00:00Z`

  const url = `/index.php?option=com_dpcalendar&view=events&format=raw&limit=0&Itemid=210&ids=100&date-start=${startDateString}&date-end=${endDateString}`
  
  useEffect(() => {
    (async () => {
      const {data} = await api.post(url)
      const mappedData = data?.data?.map((item: any) => ({
        title: item?.title,
        color: item?.backgroundColor,
        allDay: item?.allDay,
        startHour: item?.allDay ? undefined : item?.start.slice(item?.start.indexOf('T') + 1, item?.end?.lastIndexOf(':')),
        endHour: item?.allDay ? undefined : item?.end.slice(item?.end.indexOf('T') + 1, item?.end?.lastIndexOf(':'))
      }))
      setRes(mappedData)
    })()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        markingType="multi-dot"
        items={{
          '2023-12-01': [{name: 'Cycling'}, {name: 'Walking'}, {name: 'Running'}],
          '2023-12-02': [{name: 'Writing'}]
        }}
        renderItem={(item, isFirst) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
        renderEmptyData={() => (
          <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={styles.itemText}>Nenhum evento hoje.</Text>
          </View>
        )}
        minDate={startDateStringCal}
        maxDate={endDateString}
        onDayChange={(day) => console.log(day)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#888',
    fontSize: 16,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: "100%",
    height: 200,
  },
  name: {
    fontWeight: "bold",
  },
  address: {
    color: "grey",
  },
  city: {
    fontStyle: "italic",
  },
});
