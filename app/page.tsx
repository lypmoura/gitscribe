'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

function Home() {
    const form = useForm();
    const [readme, setReadme] = useState<string | null>(null);

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: data.prompt,
                }),
            });

            if (!response.ok) throw new Error('Algo deu errado');

            const { readme } = await response.json();
            setReadme(readme);
        } catch (error) {
            console.error('Erro:', error);
            setReadme('Ops, algo deu errado, Tenta de novo, vai!');
        }
    });

    return (
        <div className="flex h-screen justify-center items-center">
            <Card className="w-[460px]">
                <CardHeader>
                    <CardTitle>Gitscribe</CardTitle>
                    <CardDescription>Gere README's para deixar seu perfil mais chamativo</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <Label>Prompt</Label>
                        <Textarea {...form.register('prompt')} className="max-h-[240px]" />
                        <Button className="w-full">Gerar</Button>
                    </form>
                    {readme && (
                        <div className="mt-4 space-y-2">
                            <Label>Seu README</Label>
                            <ScrollArea className="h-[320px] w-full rounded-xl whitespace-nowrap">
                                <pre className="bg-gray-100 p-2 rounded-md text-sm overflow-auto">
                                    {readme}
                                </pre>
                            </ScrollArea>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default Home;