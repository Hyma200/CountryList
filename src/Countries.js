export const countries = [];
countries['CAN'] = ['USA'];
countries['USA'] = ['CAN', 'MEX'];
countries['MEX'] = ['USA', 'GTM', 'BLZ'];
countries['BLZ'] = ['MEX', 'GTM'];
countries['GTM'] = ['MEX', 'BLZ', 'SLV', 'HND'];
countries['SLV'] = ['GTM', 'HND'];
countries['HND'] = ['GTM', 'SLV', 'NIC'];
countries['NIC'] = ['HND', 'CRI'];
countries['CRI'] = ['NIC', 'PAN'];
countries['PAN'] = ['CRI'];

let isSubset = (largeArr, smallArr) => {
    for (let i = 0; i<smallArr.length; i++){
        if (largeArr.indexOf(smallArr[i]) === -1)
            return false;
    }
    return true;
}

export function getPath(dst, src = 'USA'){
    if (dst === src){
        return [dst];
    }
    var visited = [src];
    var finalPath = [src];
    var currCountry = finalPath[0];
    var i = 0;
    var countryFound = countries[currCountry].includes(dst);
    while(!countryFound || i<finalPath.length){
        if (isSubset(visited, countries[currCountry])){
            finalPath.splice(i, 1);
            i--;
        }
        else if (!countryFound){
            for (let j = 0; j<countries[currCountry].length; j++){
                if (!visited.includes(countries[currCountry][j])){
                    visited.push(countries[currCountry][j]);
                    finalPath.push(countries[currCountry][j]);
                }
            }
        }
        currCountry = finalPath[++i];
        if (currCountry === undefined)
            break;
        if (!countryFound)
            countryFound = countries[currCountry].includes(dst);
    }
    finalPath.push(dst);
    return finalPath;
}
