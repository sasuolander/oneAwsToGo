import {Application} from 'express';

//Abstract class used to config routes
export abstract class CommonControllerConfig {
    app: Application;
    name: string;

    constructor(app: Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }
    abstract configureRoutes(): Application;
}