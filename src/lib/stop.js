#!/usr/bin/env node
import express from "express";
import shell from "shelljs";

const app = express();
const port = process.env.PORT;

export const stop = () => {
    shell.cd('~');

    if (shell.exec("heroku ps:stop run.1").code !== 0) {
        shell.echo("Error: Heroku server down failed");
        shell.exit(1);
    }
}