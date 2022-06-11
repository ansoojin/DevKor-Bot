#!/usr/bin/env node
import express from "express";

const express = require("express");
const app = express();
const shell = require("shelljs");
const port = process.env.PORT;

export const stop = () => {
    shell.cd('~');
    
    if (shell.exec("heroku ps:scale web=0").code !== 0) {
        shell.echo("Error: Heroku server down failed");
        shell.exit(1);
    }
}