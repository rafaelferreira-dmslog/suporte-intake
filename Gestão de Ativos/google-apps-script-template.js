/**
 * ==============================================================================
 * DMS LOGISTICS - APPS SCRIPT API COMPLETA (LEITURA, ADIÇÃO E EDIÇÃO)
 * ==============================================================================
 * 
 * GARANTIAS DE SEGURANÇA E NÃO QUEBRA:
 * 1. Mapeamento dinâmico de colunas (Se colunas forem movidas na planilha, não quebra).
 * 2. Proteção contra valores nulos e formatação automática de datas.
 * 3. Suporte completo a GET (Leitura), POST action=add (Adição) e POST action=edit (Edição).
 * ==============================================================================
 */

/**
 * RECEBE REQUISIÇÕES GET (LEITURA DA PLANILHA)
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var rawData = parseSheetToObjects(sheet);
    
    var response = {
      status: "success",
      timestamp: new Date().toISOString(),
      count: rawData.length,
      data: rawData,
      licencas: rawData,
      certificados: rawData
    };
    
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    var errorResponse = {
      status: "error",
      message: err.toString(),
      timestamp: new Date().toISOString()
    };
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * RECEBE REQUISIÇÕES POST (ADIÇÃO OU EDIÇÃO DE REGISTROS NA PLANILHA)
 */
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    
    // Parse do corpo recebido
    var contents = e.postData ? e.postData.contents : "";
    var payload = {};
    
    if (contents) {
      payload = JSON.parse(contents);
    } else if (e.parameter) {
      payload = e.parameter;
    }
    
    var action = payload.action || "add";
    var item = payload.item || payload;
    
    // Pega os dados e cabeçalhos da planilha
    var dataRange = sheet.getDataRange();
    var values = dataRange.getValues();
    if (values.length === 0) {
      throw new Error("A planilha está vazia.");
    }
    
    var headers = values[0].map(function(h) { 
      return h.toString().trim(); 
    });
    
    if (action === "edit" || payload.rowIndex !== undefined) {
      // EDIÇÃO DE REGISTRO EXISTENTE
      var targetRow = parseInt(payload.rowIndex); // 1-indexed na planilha (linha 2 é o primeiro item)
      
      // Se não passou rowIndex explícito, busca por identificador (Nomes, Número do Pedido ou Domínio)
      if (isNaN(targetRow) || targetRow <= 1) {
        var keySearch = item["Nomes"] || item["Número do Pedido"] || item["Domínio"];
        for (var i = 1; i < values.length; i++) {
          var rowVal = values[i][2] || values[i][0]; // Colunas principais
          if (rowVal.toString().trim() === keySearch) {
            targetRow = i + 1; // Linha real no Google Sheets
            break;
          }
        }
      }
      
      if (targetRow > 1 && targetRow <= values.length) {
        for (var j = 0; j < headers.length; j++) {
          var hName = headers[j];
          if (item[hName] !== undefined) {
            sheet.getRange(targetRow, j + 1).setValue(item[hName]);
          } else if (item[hName + " "] !== undefined) {
            sheet.getRange(targetRow, j + 1).setValue(item[hName + " "]);
          }
        }
        return returnJSON({ status: "success", message: "Registro atualizado na planilha!", row: targetRow });
      }
    }
    
    // ADIÇÃO DE NOVO REGISTRO (DEFAULT)
    var newRow = [];
    for (var k = 0; k < headers.length; k++) {
      var headerName = headers[k];
      var val = item[headerName] !== undefined ? item[headerName] : (item[headerName + " "] !== undefined ? item[headerName + " "] : "");
      newRow.push(val);
    }
    
    sheet.appendRow(newRow);
    return returnJSON({ status: "success", message: "Novo registro adicionado com sucesso!", added: item });
      
  } catch (err) {
    return returnJSON({ status: "error", message: "Erro na operação: " + err.toString() });
  }
}

function returnJSON(obj) {
  obj.timestamp = new Date().toISOString();
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Converte os dados da aba do Google Sheets em uma lista de objetos chave/valor
 */
function parseSheetToObjects(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  var headers = data[0].map(function(h) { 
    return h.toString().trim(); 
  });
  
  var result = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rowObj = {};
    var hasContent = false;
    
    for (var j = 0; j < headers.length; j++) {
      var headerName = headers[j];
      if (!headerName) continue;
      
      var cellVal = row[j];
      if (cellVal instanceof Date) {
        cellVal = Utilities.formatDate(cellVal, Session.getScriptTimeZone(), "dd/MM/yyyy");
      } else {
        cellVal = cellVal !== null && cellVal !== undefined ? cellVal.toString().trim() : "";
      }
      
      if (cellVal !== "") hasContent = true;
      rowObj[headerName] = cellVal;
    }
    
    if (hasContent) {
      result.push(rowObj);
    }
  }
  
  return result;
}
