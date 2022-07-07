import fs from 'fs'
import path from 'path'
import { createFileSync, sendResponse } from './utils.js'

// Change the sdk import to npm (currently for testing local path is given)
// import { functions } from "../../../node-blox-sdk/index.js";

// For testing take pull from Appblox/node-blox-sdk and npm install from path
import { env } from 'node-blox-sdk'
env.init()

/**
 * List todo request hanlder
 * @param {*} req
 * @param {*} res
 */
const listTodo789 = (req, res) => {
  try {
    // health check
    if (req.params['health'] === 'health') {
      return sendResponse(res, 200, {
        success: true,
        msg: 'Health check success',
      })
    }

    const DB_FILE = path.resolve(process.env.DB_FILE_PATH)
    createFileSync(DB_FILE)
    const data = fs.readFileSync(DB_FILE, { encoding: 'utf8', flag: 'r' })
    const resData = JSON.parse(data || '[]')
    console.log('Response data:\n', resData)
    console.log('\n')
    sendResponse(res, 200, resData)
  } catch (e) {
    console.log(e)
    sendResponse(res, 500, { status: 'failed', errMsg: e.message })
  }
}
export default listTodo789

/**
 * Run the function using node-blox-sdk
 */
