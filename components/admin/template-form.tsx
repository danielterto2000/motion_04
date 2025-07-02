
'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface TemplateFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
}

export default function TemplateForm({ initialData, onSubmit, loading = false }: TemplateFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price?.toString() || '',
    category: initialData?.category || '',
    software: initialData?.software || [],
    tags: initialData?.tags || [],
    status: initialData?.status || 'DRAFT',
    isActive: initialData?.isActive ?? true,
    isFeatured: initialData?.isFeatured ?? false,
    fileSize: initialData?.fileSize || '',
    duration: initialData?.duration || '',
    resolution: initialData?.resolution || '',
    fps: initialData?.fps || '',
  });

  const [newTag, setNewTag] = useState('');
  const [newSoftware, setNewSoftware] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [templateFiles, setTemplateFiles] = useState<File[]>([]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((t: string) => t !== tag)
    }));
  };

  const addSoftware = () => {
    if (newSoftware.trim() && !formData.software.includes(newSoftware.trim())) {
      setFormData(prev => ({
        ...prev,
        software: [...prev.software, newSoftware.trim()]
      }));
      setNewSoftware('');
    }
  };

  const removeSoftware = (software: string) => {
    setFormData(prev => ({
      ...prev,
      software: prev.software.filter((s: string) => s !== software)
    }));
  };

  const handleFileUpload = (files: FileList | null, type: 'thumbnail' | 'template') => {
    if (!files) return;

    if (type === 'thumbnail') {
      setThumbnailFile(files[0]);
    } else {
      setTemplateFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeTemplateFile = (index: number) => {
    setTemplateFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      thumbnailFile,
      templateFiles,
    };
    
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Básicas */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Nome do template"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descreva o template..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOWER_THIRDS">Lower Thirds</SelectItem>
                      <SelectItem value="TRANSITIONS">Transições</SelectItem>
                      <SelectItem value="LOGOS">Logos</SelectItem>
                      <SelectItem value="INTROS">Intros</SelectItem>
                      <SelectItem value="OUTROS">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Especificações Técnicas */}
          <Card>
            <CardHeader>
              <CardTitle>Especificações Técnicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fileSize">Tamanho do Arquivo</Label>
                  <Input
                    id="fileSize"
                    value={formData.fileSize}
                    onChange={(e) => handleInputChange('fileSize', e.target.value)}
                    placeholder="ex: 150 MB"
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duração</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="ex: 10 segundos"
                  />
                </div>

                <div>
                  <Label htmlFor="resolution">Resolução</Label>
                  <Input
                    id="resolution"
                    value={formData.resolution}
                    onChange={(e) => handleInputChange('resolution', e.target.value)}
                    placeholder="ex: 1920x1080"
                  />
                </div>

                <div>
                  <Label htmlFor="fps">FPS</Label>
                  <Input
                    id="fps"
                    value={formData.fps}
                    onChange={(e) => handleInputChange('fps', e.target.value)}
                    placeholder="ex: 30 fps"
                  />
                </div>
              </div>

              {/* Software */}
              <div>
                <Label>Software Compatível</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    value={newSoftware}
                    onChange={(e) => setNewSoftware(e.target.value)}
                    placeholder="ex: After Effects"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSoftware())}
                  />
                  <Button type="button" onClick={addSoftware}>
                    Adicionar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.software.map((software: string) => (
                    <Badge key={software} variant="secondary">
                      {software}
                      <X
                        className="w-3 h-3 ml-1 cursor-pointer"
                        onClick={() => removeSoftware(software)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="ex: animação"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag}>
                    Adicionar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                      <X
                        className="w-3 h-3 ml-1 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload de Arquivos */}
          <Card>
            <CardHeader>
              <CardTitle>Arquivos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Thumbnail */}
              <div>
                <Label>Thumbnail</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files, 'thumbnail')}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-muted-foreground/50"
                  >
                    {thumbnailFile ? (
                      <div className="text-center">
                        <p className="text-sm font-medium">{thumbnailFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(thumbnailFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Clique para fazer upload da thumbnail
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Arquivos do Template */}
              <div>
                <Label>Arquivos do Template</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    multiple
                    accept=".aep,.mp4,.mov,.zip,.rar"
                    onChange={(e) => handleFileUpload(e.target.files, 'template')}
                    className="hidden"
                    id="template-upload"
                  />
                  <label
                    htmlFor="template-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-muted-foreground/50"
                  >
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Clique para fazer upload dos arquivos
                      </p>
                      <p className="text-xs text-muted-foreground">
                        .aep, .mp4, .mov, .zip, .rar
                      </p>
                    </div>
                  </label>
                </div>

                {/* Lista de arquivos */}
                {templateFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {templateFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTemplateFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configurações */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Rascunho</SelectItem>
                    <SelectItem value="PUBLISHED">Publicado</SelectItem>
                    <SelectItem value="ARCHIVED">Arquivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Ativo</Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="isFeatured">Destacado</Label>
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <Card>
            <CardContent className="pt-6">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Salvando...' : initialData ? 'Atualizar Template' : 'Criar Template'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
