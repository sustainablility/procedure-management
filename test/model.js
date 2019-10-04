let assert = require('chai').assert;
let ProcedureClass = require('../src/model/procedureClass');
let testProcedureName = 'testtest';
let testProcedurePublicity = 1;
let testProcedure = "New Testing Procedure";
let testProcedureMetaData = "Testing testing testing. ";
let testProcedureOwner = ["asfsdafdsf", "sdfaseger"];
let testProcedureAdmin = ["egrere","fwgtrthrthr"];

describe('Model Test',function () {
    let procedure;
    it('Database Connection', function (done) {
        (
            async function() {
                procedure = new ProcedureClass();
                await procedure.connect().catch(err => {
                    assert.fail(err);
                });
                done();
            }
        )();
    });

    it('Procedure Adding test', function () {
        (
            async function() {
                let addingResult = await procedure.putNewProcedure(testProcedureName, "", testProcedurePublicity, testProcedureMetaData, testProcedureOwner, testProcedureAdmin);
                assert.strictEqual(addingResult.result.ok,1,"Insert Procedure Error");
            }
        )();
    });

    it('Get procedure information from database', function (done) {
        (
            async function() {
                let procedureInfo = await procedure.getProcedureByName(testProcedureName);
                assert.notStrictEqual(procedureInfo, null, "Get procedure info fail");
                done();
            }
        )();
    });

    it('Edit Procedure', function (done) {
        (
            async function() {
                let editResult = await procedure.editProcedureByName(testProcedureName, null, testProcedure, null, null, null, null);
                assert.strictEqual(editResult.result.ok,1,"Edit procedure Error");
                done();
            }
        )();
    });

    it('Delete dataset information by dataset name', function (done) {
        (
            async function() {
                let deleteResult = await procedure.deleteProcedureByName(testProcedureName);
                assert.strictEqual(deleteResult.result.ok,1,"Delete procedure Error");
                done();
            }
        )();
    });

    it('Close database connection', function (done) {
        (
            async function() {
                procedure.done();
                done();
            }
        )();
    });
});