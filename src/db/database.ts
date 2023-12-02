import * as SQlite from 'expo-sqlite'
import churchData from '../utils/churhcsInfos/churchs.json'
import { Igreja } from './interface';

const db = SQlite.openDatabase('church.db');

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS church (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        city TEXT,
        address TEXT,
        phone TEXT,
        lat TEXT,
        lon TEXT,
        creationDate TEXT,
        about TEXT,
        schedule TEXT,
        image TEXT
      );`,
      [],
      () => console.log('Tabela criada com sucesso'),
    );
  });
};

const insertChurches = (igreja : Igreja) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO church (name, city, address, phone, lat, lon, creationDate, about, schedule, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [igreja.name,igreja.city , igreja.address, igreja.phone, igreja.lat, igreja.lon, igreja.creationDate, igreja.about, igreja.schedule, igreja.image],
      () => console.log('Igreja inserida com sucesso'),
    );
  });
};

export const insertDataFromJson = () => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT COUNT(*) as count FROM church',
      [],
      (_, { rows }) => {
        if (rows._array[0].count === 0) {
          churchData.forEach((igreja) => {
            insertChurches(igreja);
          });
        }
      },
      (error) => {
        console.error("Erro ao verificar registros existentes: ", error);
        return false;
      }
    );
  });
};
