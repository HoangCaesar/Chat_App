// ========================================== HELPER: OBJECT FILTER ===============================================
const OBJECTfILTER = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

module.exports = OBJECTfILTER;
