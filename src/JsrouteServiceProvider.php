<?php

namespace Surgio\Jsroute;

use Illuminate\Support\ServiceProvider;
use Surgio\Jsroute\Console\Commands\JsrouteGeneratorCommand;
use Surgio\Jsroute\Routes\Collection as Routes;

class JsrouteServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot()
    {
        $source = $this->getConfigPath();
        $this->publishes([$source => config_path('jsroute.php')], 'config');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $source = $this->getConfigPath();
        $this->mergeConfigFrom($source, 'jsroute');

        $this->registerGenerator();

        $this->registerCompiler();

        $this->registerCommand();
    }

    /**
     * Get the config path
     *
     * @return string
     */
    protected function getConfigPath()
    {
        return realpath(__DIR__.'/../config/jsroute.php');
    }

    /**
     * Register the generator.
     *
     * @return void
     */
    protected function registerGenerator()
    {
        $this->app->bind(
            'Surgio\Jsroute\Generators\GeneratorInterface',
            'Surgio\Jsroute\Generators\TemplateGenerator'
        );
    }

    /**
     * Register the compiler.
     *
     * @return void
     */
    protected function registerCompiler()
    {
        $this->app->bind(
            'Surgio\Jsroute\Compilers\CompilerInterface',
            'Surgio\Jsroute\Compilers\TemplateCompiler'
        );
    }

    /**
     * Register the command
     *
     * @return void
     */
    protected function registerCommand()
    {
        $this->app->singleton(
            'command.jsroute.generate',
            function ($app) {
                $config     = $app['config'];
                $routes     = new Routes($app['router']->getRoutes(), $config->get('jsroute.filter', 'all'), $config->get('jsroute.action_namespace', ''));
                $generator  = $app->make('Surgio\Jsroute\Generators\GeneratorInterface');

                return new JsrouteGeneratorCommand($config, $routes, $generator);
            }
        );

        $this->commands('command.jsroute.generate');
    }
}
