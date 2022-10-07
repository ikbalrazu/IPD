import React from "react";

export const zohoFilpathParserFromDownloadUrl = (apiStringResponse) => {
  // /api/v2/visionpointllc/av-professional-services/report/Notes/3860683000013962695/File_Upload_0/download?filepath=1639070902419_ZohoCreatorWidgetReact.zip
  if (
    apiStringResponse &&
    apiStringResponse.split("/") &&
    apiStringResponse.split("/").length > 0
  ) {
    const splitArr = apiStringResponse.split("/");
    //[8] => download?filepath=FILEID_FILENAME
    return splitArr[9].replaceAll("download?filepath=", ""); //FILEID_FILENAME
  }

  return "";
};

export const zohoFilenameParserFromDownloadUrl = (apiStringResponse) => {
  // /api/v2/visionpointllc/av-professional-services/report/Notes/3860683000013962695/File_Upload_0/download?filepath=1639070902419_ZohoCreatorWidgetReact.zip
  if (
    apiStringResponse &&
    apiStringResponse.split("/") &&
    apiStringResponse.split("/").length > 0
  ) {
    const filePath = zohoFilpathParserFromDownloadUrl(apiStringResponse);
    return filePath.replaceAll(`${filePath.split("_")[0]}_`, ""); //FILENAME
  }

  return "";
};
