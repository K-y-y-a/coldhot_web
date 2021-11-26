import { 
    showAllInfo, 
    showGameInfo 
} from "./View.js"

var n = Math.floor(Math.random() * (1000 - 100)) + 100
export var secretNumber = n.toString().split('').map(Number)
var db
export var currentId
console.log(secretNumber.join(""))

export async function initializeDB()
{
    db = await idb.openDB('games', 1, { upgrade(db) {
            db.createObjectStore('gamesInfo', {keyPath: 'gameId', autoIncrement: true})
            db.createObjectStore('turnsInfo', {keyPath: 'id', autoIncrement: true})
        },
    }); 
    getCurrentId()
}

export async function getGames()
{
    var gamesList = await db.getAll('gamesInfo')
    showAllInfo(gamesList)
}

export async function createReplay(gameId)
{
    var cursor = await db.transaction('turnsInfo', 'readonly').store.openCursor()
    var concreteGameAttempts = []
    var indexForArray = 0
    while (cursor) {
        if (cursor.value.gameId === gameId) {
            concreteGameAttempts[indexForArray] = cursor.value
            indexForArray++
        }
        cursor = await cursor.continue()
    }
    showGameInfo(concreteGameAttempts, gameId)
}

async function getCurrentId()
{
    var gamesList = await db.getAll('gamesInfo')
    currentId = gamesList.length + 1
}

export async function writeGameInfo(username)
{
    var date = new Date().toLocaleString()
    var gameStatus = 'Не окончена!'
    var computerNumber = secretNumber.join('')
    try {
        await db.add('gamesInfo', {username, date, computerNumber, gameStatus})
    } catch(err) {
        throw err
    }
}

export async function updateGameStatus(gameStatus)
{
    var cursor = await db.transaction('gamesInfo', 'readwrite').store.openCursor()
    while (cursor) {
        if (cursor.value['gameId'] === currentId) {
            var updateData = cursor.value
            updateData.gameStatus = gameStatus
            cursor.update(updateData)
        }
        cursor = await cursor.continue()
    }    
}

export async function writeAttemptInfo(gameId, gameStatus, turnNumber, guess)
{
    try {
        await db.add('turnsInfo', {gameId, turnNumber, guess, gameStatus})
    } catch(err) {
        throw err
    }
}