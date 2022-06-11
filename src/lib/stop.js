#!/usr/bin/env node
import shell from "shelljs";

export const stop = () => {
    shell.cd('~');

    if (shell.exec("heroku ps:stop run").code !== 0) {
        shell.echo("Error: Heroku server down failed");
        shell.exit(1);
    }
}