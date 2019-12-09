var sqlite3 = require("sqlite3").verbose();
const path = require('path')
var file = path.resolve(__dirname, '../../db/Stk_SmartKeywords.db');
let db

function conn() {
    if (!db || !db.open) {
        db = new sqlite3.Database(file)
    }
    return db
}

export const queryAllResults = () => {
    return new Promise((resolve, reject) => {
        let db = conn()
        db.serialize(() => {
            db.all("SELECT * FROM results GROUP BY testCaseName", function (err, rows) {
                if (err) reject(err)
                resolve(rows || [])
            });
            db.close();
        })
    })
}

export const queryExecutions = (testCaseName) => {
    return new Promise((resolve, reject) => {
        let db = conn()
        db.serialize(() => {
            db.all("SELECT executionDate, rowid FROM results WHERE testCaseName = '" + testCaseName + "' GROUP BY executionDate", function (err, rows) {
                if (err) reject(err)
                resolve(rows || [])
            });
            db.close();
        })
    })
}

export const queryExecutionInfo = (testCaseName, date) => {
    let date1 = date.replace(/r/g, '/');
    let date2 = date.replace(/r/g, '-');
    return new Promise((resolve, reject) => {
        let db = conn()
        db.serialize(() => {
            db.all("SELECT * FROM results WHERE testCaseName = '" + testCaseName +
                "' AND executionDate = '" + date1 + "' OR executionDate = '" + date2 + "'", function (err, rows) {
                    if (err) reject(err)
                    resolve(rows || [])
                });
            db.close();
        })
    })
}

export const queryAllClasses = () => {
    return new Promise((resolve, reject) => {
        let db = conn()
        db.serialize(() => {
            db.all("SELECT rowid, className FROM results GROUP BY className", function (err, rows) {
                if (err) reject(err)
                resolve(rows || [])
            });
            //db.close();
        })
    })
}

export const queryMethods = (className) => {
    return new Promise((resolve, reject) => {
        let db = conn()
        db.serialize(() => {
            db.all("SELECT testCaseName , rowid FROM results WHERE className = '" + className + "' GROUP BY testCaseName", function (err, rows) {
                if (err) reject(err)
                resolve(rows || [])
            });
            //db.close();
        })
    })
}