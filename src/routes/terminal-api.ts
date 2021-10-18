import express from 'express';

export const terminalApiRouter = express.Router();

terminalApiRouter.post("/api/v1/connect", (req: express.Request, res: express.Response) => {
    return res.sendStatus(200);
});

terminalApiRouter.get("/api/v1/terminals", (req: express.Request, res: express.Response) => {
    return res.sendStatus(200);
});

terminalApiRouter.post("/api/v1/terminals/pair", (req: express.Request, res: express.Response) => {
    return res.sendStatus(200);
});

terminalApiRouter.post("/api/v1/terminals/unpair", (req: express.Request, res: express.Response) => {
    return res.sendStatus(200);
});

terminalApiRouter.post("/api/v1/transaction/start", (req: express.Request, res: express.Response) => {
    return res.sendStatus(200);
});

terminalApiRouter.post("/api/v1/transaction/cashTendered", (req: express.Request, res: express.Response) => {
    return res.sendStatus(200);
});

terminalApiRouter.post("/api/v1/transaction/abort", (req: express.Request, res: express.Response) => {
    return res.sendStatus(200);
});

terminalApiRouter.post("/api/v1/transaction/end", (req: express.Request, res: express.Response) => {
    return res.sendStatus(200);
});

