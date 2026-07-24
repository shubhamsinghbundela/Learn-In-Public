import { type Response } from "express";

class ApiResponse {
  //Request successful (GET, PUT, PATCH)
  static ok(res: Response, message: string, data: any = null) {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  //Naya resource create hua (POST)
  static created(res: Response, message: string, data: any = null) {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  //Request accept hui, processing baad me hogi
  static accepted(res: Response, message: string, data: any = null) {
    return res.status(202).json({
      success: true,
      message,
      data,
    });
  }

  //Success, lekin response body nahi
  static noContent(res: Response) {
    return res.status(204).send();
  }
}

export default ApiResponse;
