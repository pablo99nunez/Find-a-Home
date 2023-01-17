const data = require('../src/data');
require('dotenv').config();

const DATABASE_DOCS = [{ a: 1 }, { a: 2 }, { a: 3 }];
const ALL_DOCS = {};

describe('mongoDB native API', () => {
    test('integration with DB', async (done) => {
        const dbProcess = async (docs) => {
            await data.connectToDatabase();

            // insert new docs
            const insertResult = await data.insertDocuments(
                docs
            );
            expect(insertResult).not.toBe(undefined);

            // get first ID of array - delete later
            const id = insertResult.insertedIds[0].toString();

            const findResult = await data.findDocuments(
                ALL_DOCS
            );
            expect(findResult.length).not.toBe(0);

            const count = findResult.length;

            await data.removeDocuments({ _id: data.ObjectId(id) });

            const findResult2 = await data.findDocuments(
                ALL_DOCS
            );
            expect(findResult2.length).not.toBe(0);

            expect(findResult2.length).toEqual(count - 1);

            const removeResult = await data.removeDocuments(
                ALL_DOCS
            );
            expect(removeResult).not.toBe(undefined);

            const findResult3 = await data.findDocuments(
                ALL_DOCS
            );
            expect(findResult3.length).toBe(0);
        };

        dbProcess(
            DATABASE_DOCS
        )
            .then(() => done())
            .catch((err) => done(err));
    });
});
