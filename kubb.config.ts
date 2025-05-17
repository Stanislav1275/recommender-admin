// kubb.config.js
import { defineConfig } from '@kubb/core';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginTs } from '@kubb/plugin-ts';
import { pluginZod } from '@kubb/plugin-zod';
import { pluginClient } from '@kubb/plugin-client';
import { pluginReactQuery } from '@kubb/plugin-react-query';

export default defineConfig({
    input: {
        path: 'http://77.222.37.252:8000/openapi.json', // Или локальный файл
    },
    output: {
        path: './src/shared/api/generated',
        clean: true,
    },
    plugins: [
        pluginTs(),
        pluginOas({
            output: { path: './schemas' },
        }),
        pluginZod({
            output: { path: './schemas' },
        }),
        pluginClient({
            output: { path: './clients' },
            client: 'axios',
        }),
        pluginReactQuery({
            output: { path: './hooks' },
            suspense: {xyi:true},
        }),
    ],
});
