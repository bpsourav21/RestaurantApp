import PouchDB from 'pouchdb-react-native';
import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
const SQLiteAdapter = SQLiteAdapterFactory(SQLite)
PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(SQLiteAdapter)
import config from '../config';
const DB = new PouchDB(config.LOCAL_DB_NAME, { 
    adapter: 'react-native-sqlite', 
    auto_compaction: true })
// var DB = new PouchDB(config.LOCAL_DB_NAME, {adapter: 'react-native-sqlite'});
export default DB;