<?php

namespace Surgio\Jsroute\Compilers;

use Mockery;
use PHPUnit\Framework\TestCase as PHPUnit_Framework_TestCase;

class TemplateCompilerTest extends PHPUnit_Framework_TestCase
{
    protected $compiler;

    public function setUp(): void
    {
        parent::setUp();

        $this->compiler = new TemplateCompiler();
    }

    public function testItIsOfTheCorrectInterface()
    {
        $this->assertInstanceOf(
            'Surgio\Jsroute\Compilers\CompilerInterface',
            $this->compiler
        );
    }

    public function testItCanCompileAString()
    {
        $template = 'Hello $YOU$, my name is $ME$.';
        $data     = ['you' => 'Stranger', 'me' => 'Aaron'];
        $expected = "Hello Stranger, my name is Aaron.";

        $this->assertSame($expected, $this->compiler->compile($template, $data));
    }

    public function tearDown(): void
    {
        Mockery::close();
    }

    protected function mock($class)
    {
        $mock = Mockery::mock($class);
        $this->app->instance($class, $mock);
        return $mock;
    }
}
