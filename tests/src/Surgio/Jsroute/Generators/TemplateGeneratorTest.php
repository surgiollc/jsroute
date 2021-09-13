<?php

namespace Surgio\Jsroute\Generators;

use Mockery;
use PHPUnit\Framework\TestCase as PHPUnit_Framework_TestCase;

class TemplateGeneratorTest extends PHPUnit_Framework_TestCase
{
    protected $compiler;

    protected $filesystem;

    protected $generator;

    public function setUp(): void
    {
        parent::setUp();

        $this->compiler   = $this->mock('Surgio\Jsroute\Compilers\CompilerInterface');
        $this->filesystem = $this->mock('Illuminate\Filesystem\Filesystem');

        $this->generator = new TemplateGenerator($this->compiler, $this->filesystem);
    }

    public function testItIsOfTheCorrectInterface()
    {
        $this->assertInstanceOf(
            'Surgio\Jsroute\Generators\GeneratorInterface',
            $this->generator
        );
    }

    public function testItWillCompileAndSaveATemplate()
    {
        $template     = "Template";
        $templatePath = '/templatePath';
        $templateData = ['foo', 'bar'];
        $filePath     = '/filePath';

        $this->filesystem
            ->shouldReceive('get')
            ->once()
            ->with($templatePath)
            ->andReturn($template);

        $this->filesystem
            ->shouldReceive('isDirectory')
            ->once()
            ->andReturn(true);

        $this->compiler
            ->shouldReceive('compile')
            ->once()
            ->with($template, $templateData)
            ->andReturn($template);

        $this->filesystem
            ->shouldReceive('put')
            ->once()
            ->with($filePath, $template);

        $actual = $this->generator->compile($templatePath, $templateData, $filePath);
        $this->assertSame($actual, $filePath);
    }

    public function tearDown(): void
    {
        Mockery::close();
    }

    protected function mock($class, $app = [])
    {
        $mock = Mockery::mock($class, $app);

        return $mock;
    }
}
