import AWS from "aws-sdk";
import user from "./dynamo-user";

AWS.config.update({
    region: "eu-west-1"
})

const TABLE_NAME = 'words';

export async function getWords() {
    const ddb = getDynamoDocumentClient();
    var params = {
        TableName: TABLE_NAME,
    };
    const res = await ddb.scan(params).promise();
    console.log(res.Items)
    return res.Items;
}

export async function addNewWord(newWord) {
    const ddb = getDynamoDocumentClient();
    var params = {
        TableName: TABLE_NAME,
        Item: {
            word: newWord,
            score: 0,
            dateAdded: new Date()
        }
    };
    const res = await ddb.put(params).promise();
    console.log('Put document in DynamoDB: ' + JSON.stringify(res))
}

export async function incrementScore(wordToUpdate, inc) {
    const ddb = getDynamoDocumentClient();
    var params = {
        TableName: TABLE_NAME,
        Item: {
            word: wordToUpdate.word,
            score: wordToUpdate.score + inc,
            dateAdded: new Date()
        }
    };
    const res = await ddb.put(params).promise();
    console.log('Put document in DynamoDB with increased score: ' + JSON.stringify(res))
}

function getDynamoDocumentClient() {
    const options = {
        credentials: {
            accessKeyId: user.accessKeyID,
            secretAccessKey: user.secretAccessKey
        }
    }
    return new AWS.DynamoDB.DocumentClient(options);
}