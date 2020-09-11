import AWS from "aws-sdk";
import user from "./dynamo-user";

AWS.config.update({
    region: "eu-west-1"
})

const TABLE_NAME = 'words';

export async function getWords() {
    const options = {
        credentials: {
            accessKeyId: user.accessKeyID,
            secretAccessKey: user.secretAccessKey
        }
    }
    const ddb = new AWS.DynamoDB.DocumentClient(options);
    var params = {
        TableName: TABLE_NAME,
    };
    const res = await ddb.scan(params).promise();
    console.log(res.Items)
    return res.Items;
}
